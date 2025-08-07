interface Props {
  name: string;
}

const Label = ({ name }: Props) => {
  return <div className="flex-grow sm:flex-grow-0 py-1 px-3 bg-slate-200 text-black text-center rounded-lg hover:scale-105 duration-300 cursor-pointer">
    {name}
  </div>;
};

export default Label;
