import { forwardRef } from 'react';

interface Props {
  title: string;
  setTitle: Function;
}

type Ref = HTMLInputElement;

const Children = forwardRef<Ref, Props>((props, ref) => {
  return (
    <>
      <input
        ref={ ref }
        type="text"
        value={ props.title }
        onChange={ (e: any) => props.setTitle(e.target.value) }
      />
      <p>result: { props.title } </p>
    </>
  )
});

export default Children;