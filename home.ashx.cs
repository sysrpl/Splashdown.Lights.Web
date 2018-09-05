using System;
using System.Linq;
using System.Net;
using Codebot.Web;
using Neopixels;

namespace Splashdown.Lights.Web
{
	[DefaultPage("/typescript/pages/home.html", IsTemplate = true)]
	public class HomePage : PageHandler
	{
		public bool IsRaspberry { get { return Tools.IsRaspberry; } }
		public bool IsThreadRunning { get { return Global.ThreadRunning; } }

		private static readonly string forward = "192.168.1.90";

		private void ForwardRequest()
		{
			if (IsRaspberry)
				return;
			var items = Request
				.QueryString
				.AllKeys
				.Select(key => $"{key}={Request.QueryString[key]}");
			var query = String.Join("&", items);
			var request = WebRequest.Create($"http://{forward}/?{query}");
			request.Method = Request.HttpMethod;
			request.ContentType = Request.ContentType;
			request.ContentLength = Request.ContentLength;
			using (var stream = request.GetRequestStream())
			{
				Request.InputStream.CopyTo(stream);
				stream.Close();
			}
			var response = request.GetResponse();
			Response.ContentType = response.ContentType;
			using (var stream = response.GetResponseStream())
			{
				// stream.CopyTo(Response.OutputStream);
				// we can discard the response
				stream.ReadByte();
				stream.Close();
			}
		}

		[MethodPage("reset")]
		public void StopReset()
		{
			ForwardRequest();
			Global.Reset();
		}

		[MethodPage("stop")]
		public void StopMethod()
		{
            ForwardRequest();
			Global.Stop();
		}

		[MethodPage("effects")]
		public void EffectsMethod()
		{
			var effects = Global.GetEffectNames();
			var names = String.Join(",", effects.Select(e => $"\"{e}\""));
			Write($"[ {names} ]");
		}

		[MethodPage("geteffect")]
		public void GetEffectsMethod()
		{
			var name = Global.GetEffectName();
			Write(name);
		}

		[MethodPage("seteffect")]
		public void SetEffectsMethod()
		{
            ForwardRequest();
			var name = Read("name");
			Global.SetEffectName(name);
		}

		[MethodPage("getdetails")]
		public void GetDetailsMethod()
		{
			var details = Global.GetDetails();
            Write(details);
		}

		[MethodPage("getborder")]
		public void GetBorder()
		{
			var border = Global.GetBorder();
			Write(border);
		}

		[MethodPage("getpixels")]
		public void GetPixels()
		{
			var pixels = Global.GetPixels();
			Write(pixels);
		}

		[MethodPage("setspeed")]
		public void SetSpeedMethod()
		{
            ForwardRequest();
			double d;
			if (double.TryParse(Read("value"), out d)) Global.SetSpeed(d);
		}

		[MethodPage("setlength")]
		public void SetLengthMethod()
		{
            ForwardRequest();
			double d;
			if (double.TryParse(Read("value"), out d)) Global.SetLength(d);
		}

		[MethodPage("setbrightness")]
		public void SetBrightnessMethod()
		{
            ForwardRequest();
			double d;
			if (double.TryParse(Read("value"), out d)) Global.SetBrightness(d);
		}

		[MethodPage("setsaturation")]
		public void SetSaturationMethod()
		{
            ForwardRequest();
			double d;
			if (double.TryParse(Read("value"), out d)) Global.SetSaturation(d);
		}

		[MethodPage("setcolor")]
		public void SetColor1Method()
		{
            ForwardRequest();
			int index;
			if (TryRead<int>("index", out index))
				Global.SetColor(Read("value"), index);
		}

		[MethodPage("framerate")]
		public void FramerateMethod()
		{
			Write(Global.GetFramerate());
		}
	}
}
