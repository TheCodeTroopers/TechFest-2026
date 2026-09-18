import Image from "next/image";

const IMAGE_MAP = {
  TechCon: "/techcon.png",
  "Line Follower": "/line_follower.png",
  "Web Dev Challenge": "/webex.png",
 "Rule book": "/rulebook.png",
};

export default function ImageSlot({
  label,
  ratio = "aspect-[4/3]",
  className = "",
}) {
  const imageSrc = Object.entries(IMAGE_MAP).find(([key]) =>
    label.toLowerCase().includes(key.toLowerCase())
  )?.[1];

  if (!imageSrc) {
    return (
      <div
        className={`${ratio} ${className} flex items-center justify-center bg-white`}
        role="img"
        aria-label={`Image placeholder: ${label}`}
      >
        <span className="px-4 text-center text-sm font-semibold text-neutral-700">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${ratio} ${className} relative overflow-hidden bg-white`}
    >
      <Image
        src={imageSrc}
        alt={label}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}