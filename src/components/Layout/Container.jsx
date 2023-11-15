import Back from "../Back";

export default function Container({ children }) {
  return (
    <>
      <div className="h-4 bg-zinc-900"></div>
      <div className="bg-white h-[95] w-full p-2">
        <Back />
        <div className="h-[95%] py-[1rem]">{children}</div>
      </div>
    </>
  );
}
