interface account {
  id: string;
  password: string;
  group: string[];
}

interface accountExt extends account {
  idx: number;
}

export { account, accountExt };