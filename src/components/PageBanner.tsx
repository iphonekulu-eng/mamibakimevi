import Image from "next/image";

export function PageBanner({
  src,
  alt,
  title,
  subtitle,
}: {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-3xl">
      <div className="relative h-52 md:h-72">
        <Image src={src} alt={alt} fill priority className="object-cover" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/80 via-teal-dark/35 to-teal-dark/15" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-cream md:p-10">
        <h1 className="font-serif text-4xl md:text-5xl">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-2xl text-cream/90">{subtitle}</p> : null}
      </div>
    </div>
  );
}

export function SidePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative hidden min-h-[320px] overflow-hidden rounded-3xl md:block">
      <Image src={src} alt={alt} fill className="object-cover" sizes="40vw" />
    </div>
  );
}
