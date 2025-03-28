import { useState, useCallback } from 'react';
import { useSlideContext } from '../context/SlideContext';

export const useSlideEditor = () => {
  const { state, dispatch } = useSlideContext();
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handleTextChange = useCallback((field, value) => {
    dispatch({
      type: 'UPDATE_TEXT',
      payload: { field, value }
    });
  }, [dispatch]);

  const handleThemeChange = useCallback((property, value) => {
    dispatch({
      type: 'UPDATE_THEME',
      payload: { [property]: value }
    });
  }, [dispatch]);

  const handleImageUpload = useCallback((file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({
          type: 'UPDATE_IMAGE',
          payload: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }, [dispatch]);

  const saveToLocalStorage = useCallback(() => {
    localStorage.setItem('slideState', JSON.stringify(state));
  }, [state]);

  const loadFromLocalStorage = useCallback(() => {
    const savedState = localStorage.getItem('slideState');
    if (savedState) {
      dispatch({
        type: 'LOAD_STATE',
        payload: JSON.parse(savedState)
      });
    }
  }, [dispatch]);

  return {
    isPreviewMode,
    setIsPreviewMode,
    handleTextChange,
    handleThemeChange,
    handleImageUpload,
    saveToLocalStorage,
    loadFromLocalStorage
  };
}; 