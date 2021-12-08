interface doc {
  title: string;
  url: string;
}

interface docExt extends doc {
  idx: number;
}

export { doc, docExt };