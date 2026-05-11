export function attachPasswordToggle({ inputSelector, toggleSelector }) {
  const inputs = document.querySelectorAll(inputSelector);
  if (!inputs.length) return;

  inputs.forEach((input) => {
    const wrapper = input.closest('.password-wrapper');
    const btn = wrapper ? wrapper.querySelector(toggleSelector) : null;
    if (!btn) return;

    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', 'Show password');

    btn.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';

      btn.setAttribute('aria-pressed', String(isPassword ? 'true' : 'false'));
      btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');

      btn.textContent = isPassword ? '🙈' : '👁️';
    });
  });
}

export function initPasswordToggles() {
  attachPasswordToggle({
    inputSelector: '#password, #signupPassword',
    toggleSelector: '.password-toggle'
  });
}
