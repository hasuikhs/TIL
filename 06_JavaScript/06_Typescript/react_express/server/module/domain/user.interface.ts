interface user {
  name: string;
}

interface userExt extends user {
  idx: number;
}

export { user, userExt };