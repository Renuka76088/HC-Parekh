import React from "react";
import { Linkedin } from "lucide-react";

const LinkedInFloat = () => {
    return (
        <a
            href="https://www.linkedin.com/in/hc-parekh-32a42337b"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#0A66C2] p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
            aria-label="LinkedIn Profile"
        >
            <Linkedin color="white" size={26} />
        </a>
    );
};

export default LinkedInFloat;
