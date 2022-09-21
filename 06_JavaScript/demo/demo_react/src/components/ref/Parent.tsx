import { useEffect, useRef, useState } from 'react';
import Children from './Children';

function Parent() {

  const [title, setTitle] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [title])

  return (
    <Children ref={ inputRef } title={ title } setTitle={ setTitle }/>
  );
}

export default Parent;