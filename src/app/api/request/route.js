import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { method, url, headers, body } = await request.json();

        const startTime = Date.now();

        const fetchOptions = {
            method,
            headers: headers || {},
        };

        if (method !== 'GET' && method !== 'HEAD' && body) {
            fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
        }

        const response = await fetch(url, fetchOptions);
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        const responseHeaders = {};
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value;
        });

        const contentType = response.headers.get('content-type');
        let responseData;

        if (contentType && contentType.includes('application/json')) {
            responseData = await response.json();
        } else {
            responseData = await response.text();
        }

        return NextResponse.json({
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders,
            body: responseData,
            responseTime,
        });
    } catch (error) {
        console.error('API Proxy Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
