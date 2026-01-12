
async function test() {
    console.log("Testing Hugging Face API...");
    try {
        const res = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'I have a red rash on my arm that itches.' })
        });

        const txt = await res.text();

        if (res.status !== 200) {
            console.error("Error Status:", res.status);
            console.error("Body:", txt);
            return;
        }

        console.log("Success! Response:");
        console.log(txt);

    } catch (e) {
        console.error("Fetch Error:", e);
    }
}
test();
