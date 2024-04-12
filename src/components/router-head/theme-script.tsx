export const themeStorageKey = 'theme-preference';

export const ThemeScript = () => {
  const themeScript = `
        (function() {
            function setTheme(theme) {
            document.documentElement.className = theme;
            localStorage.setItem('theme', theme);
            }
            var theme = localStorage.getItem('theme');
            // console.log(theme);
            if (theme) {
            setTheme(theme);
            } else {
            setTheme('light');
            }
        })();
        window.addEventListener('load', function() {
            var themeSwitch = document.getElementById('hide-checkbox');
            themeSwitch.checked = localStorage.getItem('theme') === 'light'? true: false;
        }
        );
        `;
  return <script dangerouslySetInnerHTML={themeScript} />;
};
