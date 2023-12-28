import React from 'react';

interface ClassInfo {
    name: string;
    professor: string;
    difficulty: string;
    time: string;
}

interface CSCI_CatalogInfoProps {
    classes: ClassInfo[];
}

const CSCI_CatalogInfo: React.FC<CSCI_CatalogInfoProps> = ({ classes }) => {

    return (
        <tbody>
            {classes.map((classInfo, index) => (
                <tr key={index} className="border-b border-dashed last:border-b-0">
                    <td className="p-3 pl-0">
                        <div className="flex items-center">
                            <div className="flex flex-col justify-start">
                                <a className="mb-1 font-semibold transition-colors duration-200 ease-in-out
                                    text-lg/normal text-secondary-inverse hover:text-primary">
                                    {classInfo.name}
                                </a>
                            </div>
                        </div>
                    </td>
                    <td className="p-3 pr-8 text-center">
                        <span className="font-semibold text-light-inverse text-md/normal">
                            {classInfo.professor}
                        </span>
                    </td>
                    <td className=" pl-8 text-center">
                        <span className={
                            `text-start align-baseline inline-flex px-4 py-3 mr-auto items-center
                                font-semibold text-[.95rem] leading-none rounded-lg
                                ${classInfo.difficulty === "Moderate"
                                ? "text-warning bg-warning-light"
                                : classInfo.difficulty === "Low"
                                    ? "text-success bg-success-light"
                                    : "text-danger bg-danger-light"
                            }`}>
                            {classInfo.difficulty}
                        </span>
                    </td>
                    <td className="pr-0 text-center">
                        <span className="font-semibold text-light-inverse text-md/normal pr-10">
                            {classInfo.time}
                        </span>
                    </td>
                    <td className="p-3 pr-4 text-center">
                        <button className="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary
                        flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center
                        align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none
                        border-0 justify-center"
                        >
                            <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </span>
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default CSCI_CatalogInfo;
