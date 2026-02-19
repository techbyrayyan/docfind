export default function ServiceCard({ img, title, description, imgClassName = "mt-[-50px]" }) {
    return (
        <div className="flex items-center justify-center gap-2 rounded bg-white px-10 py-14 shadow">
            <img className={imgClassName} src={img} alt="" />
            <div>
                <h3 className="font-bold text-[#005963]">{title}</h3>
                <p className="mt-2 text-[13px] text-[#005963]">
                    {description}
                </p>
            </div>
        </div>
    );
}
