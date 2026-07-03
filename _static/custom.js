document.addEventListener("DOMContentLoaded", () => {
    const EXEC_LABEL = "Execution:";

    document.querySelectorAll("dl.js.function, dl.js.method, dl.js.attribute").forEach((entry) => {
        // Look for a <p> matching: <strong>Execution:</strong> <code>...</code>.
        const paragraphs = entry.querySelectorAll("dd > p");

        paragraphs.forEach((p) => {
            const strongEl = p.querySelector("strong");
            if (!strongEl || !strongEl.textContent.trim().startsWith(EXEC_LABEL)) {
                return;
            }

            const codeEl = p.querySelector("code");
            if (!codeEl) return;

            const value = codeEl.textContent.trim().toLowerCase();
            if (value !== "asynchronous" && value !== "synchronous") return;

            // Build the badge element
            const badge = document.createElement("span");
            badge.className = `exec-badge exec-badge--${value}`;
            badge.textContent = value === "asynchronous" ? "Async" : "Sync";

            // Insert the badge right after the signature (dt), before the description
            const dt = entry.querySelector("dt");
            if (dt && !dt.querySelector(".exec-badge")) {
                dt.appendChild(badge);
            }

            // Remove the source text paragraph to avoid redundancy
            p.remove();
        });
    });
});