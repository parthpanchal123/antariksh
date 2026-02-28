import LoadingImage from "./LoadingImage";

const DateImage = (props: any) => {
  return (
    <div
      className="relative w-full aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden group cursor-pointer border border-dark/50 bg-dark/30 hover:border-accent hover:shadow-[0_0_30px_rgba(123,97,255,0.2)] transition-all duration-500"
      key={props.index}
      onClick={() => props.click()}
    >
      {/* Fallback pattern / Loading Background */}
      <div className="absolute inset-0 bg-dark/50 z-0"></div>

      {/* Background Image Loading */}
      {props.image && (
        <img
          src={props.image}
          alt={props.title}
          className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      )}

      {/* Heavy Cinematic Gradient Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0A0A14] via-[#0A0A14]/40 to-transparent"></div>

      {/* Date Badge */}
      <div className="absolute top-4 right-4 z-30">
        <span className="font-mono text-[10px] font-bold tracking-widest bg-dark/80 backdrop-blur-md text-accent border border-accent/20 px-3 py-1.5 rounded-full uppercase">
          {props.date} {props.month} {props.year}
        </span>
      </div>

      {/* Content Foot */}
      <div className="absolute bottom-0 left-0 w-full p-6 z-30">
        <h3 className="font-sans font-bold text-lg md:text-xl text-primary leading-tight line-clamp-2">
          {props.title}
        </h3>
      </div>
    </div>
  );
};

export default DateImage;
