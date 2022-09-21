import { forwardRef, LegacyRef } from 'react';

interface Props {
  title: string;
  setTitle: Function;
}

type Ref = LegacyRef<HTMLInputElement>;

// arrow function style
// const Children = forwardRef<Ref, Props>(({ title, setTitle }, ref) => {
//   return (
//     <>
//       <input
//         ref={ ref }
//         type="text"
//         value={ title }
//         onChange={ (e: any) => setTitle(e.target.value) }
//       />
//       <p>result: { title } </p>
//     </>
//   )
// });

function Children({ title, setTitle }: Props, ref: Ref) {
  return (
    <>
      <input
        ref={ ref }
        type="text"
        value={ title }
        onChange={ (e: any) => setTitle(e.target.value) }
      />
      <p>result: { title } </p>
    </>
  )
}

export default forwardRef(Children);