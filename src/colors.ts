import Color from 'color';


export function textColor(color: string) {
  const c = Color(color);

  return c.isDark() ? 'white' : 'black';
}


export function dangerColor() {
  return Color('#ff4646');
}


export function shadowColor(color: string) {
  const c = Color(color);

  return (c.isDark() ? c.darken(.35) : c.darken(.15));
}
