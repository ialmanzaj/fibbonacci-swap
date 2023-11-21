import React, { useEffect, useState } from "react";
import { BelvoConnectButton } from "./BelvoConnectButton";

interface WidgetProps {
  src?: string;
}
// Assuming belvoSDK is a global variable defined elsewhere
declare global {
  interface Window {
    belvoSDK: {
      createWidget: (access: any, config: any) => any; // Adjust types as needed
    };
  }
}
const BankingWidget: React.FC<WidgetProps> = ({ src = "https://cdn.belvo.io/belvo-widget-1-stable.js" }) => {
  const [buttonText, setbuttonText] = useState("Conecta cuenta de banco");

  // Function to call your server-side to generate the access_token and retrieve your access token
  async function getAccessToken(): Promise<{ access: string }> {
    // Make sure to change /get-access-token to point to your server-side.
    return fetch("/api/access_token", {
      method: "GET",
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.error("Error:", error));
  }

  const successCallbackFunction = (link: string, institution: string) => {
    // Do something with the link and institution,
    // such as associate it with your registered user in your database.
    console.log("success", institution, link);
    setbuttonText(`Conectado a ${institution}`);
    return fetch("/api/belvo/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        linkId: link,
        institution: institution,
      }),
    })
      .then(response => response.json())
      .then(data => data)
      .catch(error => console.error("Error:", error));
  };

  const onExitCallbackFunction = (data: any) => {
    // Do something with the exit data.
  };

  const onEventCallbackFunction = (data: any) => {
    // Do something with the exit data.
  };

  useEffect(() => {
    // Create script
    const node = document.createElement("script");
    node.src = src;
    node.type = "text/javascript";
    node.async = true;

    // Add script to document body
    document.body.appendChild(node);

    return () => {
      // Clean up script on component unmount
      document.body.removeChild(node);
    };
  }, [src]); // Only re-run effect if script src changes

  async function launchWidget() {
    try {
      const { access } = await getAccessToken();
      window.belvoSDK.createWidget(access, config).build();
    } catch (error) {
      console.error("Error creating widget:", error);
    }
  }

  const config = {
    locale: "es", // 'en' for English
    country_codes: ["CO"],
    institution_types: ["retail"],
    debug: true,
    // Add your startup configuration here.
    callback: (link: string, institution: string) => successCallbackFunction(link, institution),
    onExit: (data: any) => onExitCallbackFunction(data),
    onEvent: (data: any) => onEventCallbackFunction(data),
  };
  console.log(buttonText);

  return (
    <>
      <BelvoConnectButton text={buttonText} launchWidget={launchWidget} />
      <div id="belvo" />
    </>
  );
};

export default BankingWidget;
//export { createWidget };
