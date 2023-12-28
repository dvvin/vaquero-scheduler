import React from 'react';
import { useState, useEffect } from 'react';
// import CSCI_CatalogInfo from './Info';
// import prisma from '../../../../lib/prisma';


interface ClassInfo {
    name: string;
    professor: string;
    difficulty: string;
    time: string;
}

const CSCI_Catalog: React.FC = () => {
    const classes: ClassInfo[] = [
        {
            name: "Introduction to Computer Science",
            professor: "Tim Wylie",
            difficulty: "High",
            time: "9:30 A.M"
        },
        {
            name: "Advanced Programming",
            professor: "Jane Doe",
            difficulty: "Low",
            time: "2:00 P.M"
        }
    ];

    return (
        <>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/riva-dashboard-tailwind/riva-dashboard.css" /><div className="flex flex-wrap -mx-3 mb-5">
                <div className="w-3/4 max-w-full px-3 mb-6 pt-60 mx-auto">
                    <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
                        <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                                <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                                    <span className="mr-3 font-semibold text-dark">2023-2024</span>
                                </h3>
                            </div>
                            <div className="flex-auto block py-8 pt-6 px-9">
                                <div className="overflow-x-auto">
                                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                                        <thead className="align-bottom">
                                            <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                                                <th className="pb-3 text-start min-w-[175px]">CLASS</th>
                                                <th className="pb-3 pr-6 text-center min-w-[100px]">PROFESSOR</th>
                                                <th className="pb-3 pl-8 text-center min-w-[175px]">DIFFICULTY</th>
                                                <th className="pb-3 pr-10 text-center min-w-[100px]">TIME</th>
                                                <th className="pb-3 text-end min-w-[50px]">DETAILS</th>
                                            </tr>
                                        </thead>

                                        {/* <CSCI_CatalogInfo classes={classes} /> */}


                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3>Users:</h3>
                    <ul>

                    </ul>
                </div>

            </div>
        </>
    );
};

export default CSCI_Catalog;
