'use client';

import Error from 'next/error';
import Link from "next/link";

export default function NotFound() {
    return (
        <html lang="en" >
            <body>
                <Error statusCode={404} displayName="Bincial" title="Bincial: your page is not found" >
                </Error>

            </body>
        </html>
    );
}