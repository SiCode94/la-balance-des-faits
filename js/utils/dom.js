/** Crée un élément DOM. Les enfants de type string sont insérés comme texte (pas de HTML). */
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === false || value == null) continue;
    node.setAttribute(key, value === true ? '' : value);
  }
  for (const child of [].concat(children)) {
    node.append(child instanceof Node ? child : document.createTextNode(child));
  }
  return node;
}

const nombre = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 });
export const formatNombre = (n) => nombre.format(n);

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
