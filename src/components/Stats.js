import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../app/app'

export default function Stats() {
    const [state, setState] = useContext(AppContext);
    return (
        <button type="button" className="btn btn-primary position-relative">
            Caddy
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {state.products.length}
                <span className="visually-hidden">unread messages</span>
            </span>
        </button>
    );
}

