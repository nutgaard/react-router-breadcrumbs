import React from 'react';

export function HelloComponent({ routes, params }) {
    return (
        <div>
            <h1>Hello {params.name}</h1>
        </div>
    );
}

export function GoodByeComponent({ routes, params }) {
    return (
        <div>
            <h1>Goodbye {params.name}</h1>
        </div>
    );
}