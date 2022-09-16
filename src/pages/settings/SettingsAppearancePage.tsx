import { useDispatch } from 'react-redux';
import { setTheme } from '../../store/settings/settingsSlice';
import { Page } from '../../utils/styles';
import { SelectableTheme } from '../../utils/types';

export const SettingsAppearancePage = () => {
  const dispatch = useDispatch();

  const handleThemeChange = (theme: SelectableTheme) => {
    dispatch(setTheme(theme));
    localStorage.setItem('theme', theme);
  };

  return (
    <Page>
      <div>
        <span>Theme</span>
        <form>
          <input
            type="radio"
            id="dark"
            name="theme"
            onChange={() => handleThemeChange('dark')}
          />
          <label htmlFor="dark">Dark</label>
          <input
            type="radio"
            id="light"
            name="theme"
            onChange={() => handleThemeChange('light')}
          />
          <label htmlFor="light">Light</label>
        </form>
      </div>
    </Page>
  );
};
