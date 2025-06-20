'use client'
import React, { useState } from 'react'
import type { ViewDescriptionClientProps } from 'payload'

export function IntegrationInstructions(props: ViewDescriptionClientProps) {
    const [ isCollapsed, setIsCollapsed ] = useState(false)
    const styleUrl = `<link rel="stylesheet" href="https://plugin.netset.io/style.css" />`
    const jsUrl = `<script src="https://plugin.netset.io/script.js"></script>`

  return <div>
    <h3 className='integration-instructions'>
        <button onClick={() =>  setIsCollapsed(prev => !prev)} type="button" className="btn list-create-new-doc__create-new-button btn--icon-style-without-border btn--size-small btn--withoutPopup btn--style-pill btn--withoutPopup">
        <span className="btn__content">
            <span className="btn__label">
                { isCollapsed ? 'Hide' : 'Show' } Steps for Integration
            </span>
        </span>
        </button>
    </h3>

    {
        isCollapsed &&
        <ul>
            <li>Import the needed CSS styles as below :
                <pre>
                    {styleUrl}
                </pre>
            </li>
            <li>Import the needed JS library as below:
                <pre>
                    {jsUrl}
                </pre>
            </li>
            <li>
            Initialize the plugin with unique website id as
            <MainScript />
            </li>
            <li>'webClientId' is a unique id given to you by netset Admin</li>
            <li>NetsetJS.init is used to inilialize the plugin</li>
            <li>
                NetsetJS.donate is used to trigger the donation flow e.g.

                <pre>
                    { '<button onclick="donate()">Donate</button>' }
                </pre>
            </li>
            <li>
                'onclick' event is for demonstration only. You can initiate donation flow whenever you want e.g. after checkout.
            </li>
        </ul>
    }
    </div>
}


export function MainScript() {
    const code = `
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            NetsetJS.init({
                config: { 
                webClientId: "your-website-id-by-netset"
                }
            });
        });

        function donate() {
            NetsetJS.triggerFlow();
        }
  </script>
  `.trim();

  return (
    <pre>
      <code>{code}</code>
    </pre>
  );
}