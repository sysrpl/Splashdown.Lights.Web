using System;
using System.IO;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Web;
using Neopixels;
using Codebot.Xml;
using System.Collections.ObjectModel;

namespace Splashdown.Lights.Web
{
	public class Global : HttpApplication
	{
		const int NUM_LIGHTS = 279;
		const int EDGE_BOTTOM = 93;
		const int EDGE_RIGHT = 139;
		const int EDGE_TOP = 233;
		const int EDGE_LEFT = 280;

		private static IEnumerable<Type> GetEffects(Assembly assembly)
		{
			var types = assembly.GetTypes(); ;
			return types
				.Where(t => t.IsSubclassOf(typeof(Effect)))
				.OrderBy(t => EffectName(t));
		}

		private static string EffectName(Type type)
		{
			var s = type.Name;
			s = s.Replace("Effect", "");
			return s.ToLower();
		}

		private static object wait = new Object();
		private static Thread thread = null;
		private static Type effect = null;
		private static Type[] effects = new Type[0];
		private static Effect[] selection = new Effect[0];
		private static Effect selected = null;
		private static int frame = 0;
		private static int framerate = 0;
		private static bool stopped = false;

		public static bool ThreadRunning { get; private set; } = false;

		public static IEnumerable<string> GetEffectNames()
		{
			return effects.Select(e => EffectName(e));
		}

		public static void Reset()
		{
			lock (wait)
				if (selected != null)
				{
					selected.Reset();
					SaveEffect(selected);
				}
		}

		public static void Stop()
		{
			lock (wait)
			{
				effect = null;
				selected = null;
			}
		}

		public static void SetEffectName(string name)
		{
			var e = effects.Where(n => EffectName(n) == name).FirstOrDefault();
			if (e == null)
				return;
			lock (wait)
				effect = e;
		}

		public static string GetEffectName()
		{
			Type e;
			lock (wait)
				e = effect;
			return e == null ? String.Empty : EffectName(e);
		}

		private static string ColorToString(Color c)
		{
			return "#" + c.R.ToString("X2") + c.G.ToString("X2") + c.B.ToString("X2");
		}

		private static Color StringToColor(string s)
		{
			return ColorTranslator.FromHtml(s);
		}

		private static string settings;
		private static Document store;
		private static Element root;

		private static void SaveEffect(Effect e)
		{
			var name = EffectName(e.GetType());
			var node = root.FindNode($"effect[@name=\"{name}\"]");
			if (node == null)
			{
				node = root.Nodes.Add("effect");
				node.Attributes.Add("name").Value = name;
			}
			var f = node.Filer;
			f.Write("color1", ColorToString(e.Color1));
			f.Write("color2", ColorToString(e.Color2));
			f.Write("color3", ColorToString(e.Color3));
			f.Write("speed", e.Speed);
			f.Write("length", e.Length);
			f.Write("brightness", e.Brightness);
			f.Write("saturation", e.Saturation);
			store.Save(settings, true);
		}

		private static void LoadEffect(Effect e)
		{
			var node = root.FindNode($"effect[@name='{EffectName(e.GetType())}']");
			if (node == null)
				return;
			var f = node.Filer;
			e.Color1 = StringToColor(f.ReadString("color1", ColorToString(e.Color1)));
			e.Color2 = StringToColor(f.ReadString("color2", ColorToString(e.Color2)));
			e.Color3 = StringToColor(f.ReadString("color3", ColorToString(e.Color3)));
			e.Speed = f.Read("speed", e.Speed);
			e.Length = f.Read("length", e.Length);
			e.Brightness = f.Read("brightness", e.Brightness);
			e.Saturation = f.Read("saturation", e.Saturation);
		}

		const string DETAILS = "{{ \"name\": \"{0}\", \"long\": \"{1}\", \"description\": \"{2}\", \"direction\": {3}, " +
			"\"speed\": {4}, \"length\": {5}, \"brightness\": {6}, \"saturation\": {7}, " +
			"\"color1\": \"{8}\", \"color2\": \"{9}\", \"color3\": \"{10}\", \"framerate\": {11} }}";

		public static string GetDetails()
		{
			lock (wait)
			{
				if (selected == null)
					return String.Format(
						DETAILS, "none", "none", "no program selected", 1,
						1, 1, 1, 1,	"#FFFFFF", "#FFFFFF", "#FFFFFF", 0);
				var c1 = ColorToString(selected.Color1);
				var c2 = ColorToString(selected.Color2);
				var c3 = ColorToString(selected.Color3);
				return String.Format(
					DETAILS, EffectName(effect), selected.Name, selected.Description, selected.Direction,
					selected.Speed, selected.Length, selected.Brightness, selected.Saturation,
					c1, c2, c3, framerate);
			}
		}

		const string BORDER = "{{ \"length\": {0}, \"bottom\": {1}, \"right\": {2}, " +
			"\"top\": {3}, \"left\": {4} }}";
		
		public static string GetBorder()
		{
			return String.Format(BORDER, NUM_LIGHTS, EDGE_BOTTOM, EDGE_RIGHT, EDGE_TOP, EDGE_LEFT);
		}

		private static double Clamp(double lo, double hi, double value)
		{
			if (value < lo)
				return lo;
			if (value > hi)
				return hi;
			return value;
		}

		public static void SetColor(string value, int index)
		{
			var c = StringToColor(value);
			lock (wait)
				if (selected != null)
				{
					switch (index)
					{
						case 1: selected.Color1 = c; break;
						case 2: selected.Color2 = c; break;
						case 3: selected.Color3 = c; break;
					}
					SaveEffect(selected);
				}
		}

		public static void SetSpeed(double d)
		{
			lock (wait)
				if (selected != null) { selected.Speed = Clamp(-5, 5, d); SaveEffect(selected); }

		}

		public static void SetLength(double d)
		{
			lock (wait)
				if (selected != null) { selected.Length = Clamp(0.25, 10, d); SaveEffect(selected); }
		}

		public static void SetBrightness(double d)
		{
			lock (wait)
				if (selected != null) { selected.Brightness = Clamp(0, 1, d); SaveEffect(selected); }
		}

		public static void SetSaturation(double d)
		{
			lock (wait)
				if (selected != null) { selected.Saturation = Clamp(0, 1, d); SaveEffect(selected); }
		}

		public static byte[] GetPixels()
		{
			lock (wait)
				if (selected == null)
				{
					var data = new byte[1];
					data[0] = 0;
					return data;
				}
				else
				{
					var data = new byte[NUM_LIGHTS * 3];
					var i = 0;
					foreach (var p in pixels)
					{
						var c = p.Color;
						data[i++] = c.R;
						data[i++] = c.G;
						data[i++] = c.B;
					}
					return data;
				}
		}

		public static int GetFramerate()
		{
			int f;
			lock (wait)
				f = framerate;
			return f;
		}

		private static ReadOnlyCollection<Light> pixels = null;

		private static void RunLights()
		{
			ThreadRunning = true;
			Type current = null;
			selected = null;
			var stopwatch = new Stopwatch();
			using (var strip = new Strip(NUM_LIGHTS))
			{
				lock (wait)
					pixels = strip.Lights;
				strip.DefineEdge(EDGE_BOTTOM, EDGE_RIGHT, EDGE_TOP, EDGE_LEFT);
				var running = true;
				while (running)
				{
					if (selected != null)
					{
						lock (wait)
						{
							selected.Execute(strip);
							strip.Render();
						}
						frame++;
						if (frame % 10 == 0)
						{
							frame = 0;
							stopwatch.Stop();
							var f = stopwatch.ElapsedMilliseconds / 1000f;
							lock (wait)
								if (f > 0)
									framerate = (int)Math.Truncate((1 / f) * 10);
								else
									framerate = 0;
							stopwatch.Reset();
							stopwatch.Start();
						}
					}
					Thread.Sleep(10);
					lock (wait)
					{
						if (effect != current)
						{
							frame = 0;
							framerate = 0;
							stopwatch.Reset();
							stopwatch.Start();
							if (effect == null)
							{
								current = effect;
								selected = null;
								strip.Clear();
							}
							else
							{
								current = effect;
								for (var i = 0; i < effects.Length; i++)
									if (effects[i] == effect)
									{
										selected = selection[i];
										break;
									}
							}
						}
						running = !stopped;
					}
				}
				lock (wait)
					strip.Clear();
			}
			ThreadRunning = false;
		}		

		protected void Application_Start()
		{
			Tools.NumLights = NUM_LIGHTS;
			settings = Context.Server.MapPath("/settings.xml");
			store = new Document();
			if (File.Exists(settings))
				store.Load(settings);
			root = store.Force("settings");
			effects = GetEffects(Tools.LightsAssembly).ToArray();
			selection = new Effect[effects.Length];
			for (var i = 0; i < selection.Length; i++)
			{
				selection[i] = (Effect)Activator.CreateInstance(effects[i]);
				selection[i].Reset();
				LoadEffect(selection[i]);
			}
			thread = new Thread(RunLights);
			thread.Start();
		}

		protected void Application_End()
		{
			lock (wait)
				stopped = true;
			thread.Join();
		}
	}
}
