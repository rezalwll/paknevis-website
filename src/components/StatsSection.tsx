import React from "react";

type Stat = {
    value: string;
    label: string;
};

const stats: Stat[] = [
    { value: "25K+", label: "کاربران فعال" },
    { value: "120K+", label: "دانلودها" },
    { value: "350+", label: "پروژه‌های کامل‌شده" },
    { value: "15+", label: "جوایز کسب‌شده" },
];

const StatsSection: React.FC = () => {
    return (
        <section className="relative bg-white py-16 min-h-screen overflow-hidden flex justify-center items-center">
            <div
                className="absolute inset-y-0 w-full 
                [background:radial-gradient(circle_at_center,rgba(168,85,247,0.3),transparent_70%)] 
                blur-3xl -translate-x-1/4
                [mask-image:linear-gradient(to_right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)] 
                [mask-repeat:no-repeat] [mask-size:100%_100%]
                [mask-composite:intersect]
                [-webkit-mask-image:linear-gradient(to_right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)]"
                aria-hidden="true"
            />
            <div
                className="absolute top-0 left-0 w-120 h-120 
                [background:radial-gradient(circle_at_center,rgba(255,165,0,0.3),transparent_70%)] 
                blur-3xl -translate-x-1/3 -translate-y-1/3 z-0"
                aria-hidden="true"
            />
            <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent"></div>
            <div className="pointer-events-none absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
            <div className="relative z-10 container mx-auto px-6 flex justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center ">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="stat-box p-6 rounded-lg shadow-lg bg-white backdrop-blur-lg transform transition-all hover:scale-105 hover:shadow-lg min-h-[300px] bg-gradient-to-b from-transparent to-purple-100/30 w-[300px]"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-purple-700">
                                {stat.value}
                            </h2>
                            <p className="mt-2 text-gray-600">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;