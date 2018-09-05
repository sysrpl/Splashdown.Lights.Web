# Codebot.Typescript

A simple typescript starter project. Features a boot object that can declaritively include html, css, and javascript before invoking your "main" entry point.

```typescript
boot.use("jquery");

function main() {
	$("body").text("hello world");
}
```
