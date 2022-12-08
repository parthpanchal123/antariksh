import LoadingImage from "./LoadingImage";

const DateImage = (props: any) => {
  return (
    <div
      className="relative rounded-md w-full max-w-xs ml-auto mr-auto flex items-start justify-start text-left bg-cover bg-center shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 cursor-pointer"
      key={props.index}
      onClick={() => props.click()}
    >
      <LoadingImage
        src={props.image}
        width="358"
        height="263"
        classes="rounded-lg cursor-pointer"
        click={() => props.click()}
      />
      <div className="absolute rounded-md top-0 mt-0 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
      <div className="absolute top-0 right-0 left-0 mx-2 mt-2 flex justify-end rounded-md">
        <span className="text-xs bg-indigo-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500">
          {props.date + " " + props.month + "," + " "+ props.year}
        </span>
      </div>
      <main className="absolute p-5 z-10 bottom-0">
        <span className="text-md tracking-tight font-medium leading-7 font-regular text-white ">
          {props.title}
        </span>
      </main>
    </div>
  );
};

export default DateImage;
