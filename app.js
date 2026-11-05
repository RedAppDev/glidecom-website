const SUPABASE_URL = 'https://hqggjbjicpyqmghqxwgi.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_lsJTWRZie0vXhbIMQfJ87A_YOdWrC3k';

const form = document.getElementById('nl');
const msg = document.getElementById('msg');
const signup = document.getElementById('signup');
const scriptUrl = document.currentScript ? document.currentScript.src : document.baseURI;
const showDone = (label) => {
    const img = document.createElement('img');
    img.src = new URL('assets/check_icon.svg', scriptUrl).href;
    img.alt = label;
    img.className = 'done';
    signup.replaceChildren(img);
};
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const email = form.email.value.trim().toLowerCase();
    btn.disabled = true;
    msg.textContent = '';
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_emails`, {
            method: 'POST',
            headers: {
                apikey: SUPABASE_PUBLISHABLE_KEY,
                Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
                'Content-Type': 'application/json',
                Prefer: 'return=minimal'
            },
            body: JSON.stringify({ email })
        });
        if (res.ok) { showDone(form.dataset.ok); return; }
        else if (res.status === 409) { showDone(form.dataset.dup); return; }
        else throw new Error(res.status);
    } catch (err) {
        msg.textContent = form.dataset.err;
    } finally {
        btn.disabled = false;
    }
});
