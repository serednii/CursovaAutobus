'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function LinkDriver() {
    const pathname = usePathname();

    return (
        <div>
            <ul className="flex">
                <li>
                    <Link
                        style={{
                            backgroundColor: "yellow",
                            padding: "5px",
                            borderRadius: "15px",
                        }}
                        className={pathname === "/driver" ? "active-link" : ""}
                        href="/driver"
                    >
                        Driver`s Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        style={{
                            backgroundColor: "yellow",
                            padding: "5px",
                            borderRadius: "15px",
                        }}
                        className={pathname === "/driver/createroute" ? "active-link" : ""}
                        href="/driver/createroute"
                    >
                      Create route
                    </Link>
                </li>
                <li>
                    <Link
                        style={{
                            backgroundColor: "yellow",
                            padding: "5px",
                            borderRadius: "15px",
                        }}
                        className={pathname === "/driver/myroutes" ? "active-link" : ""}
                        href="/driver/myroutes"
                    >
                        My routes
                    </Link>
                </li>
            </ul>
        </div>
    )
}