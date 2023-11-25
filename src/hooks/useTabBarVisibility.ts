import { useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { hideTabBar, showTabBar } from '../reducers/actions';

export function useTabBarVisibility() {
  // Using useRef to keep track of the lastY position without causing re-renders
  const lastYRef = useRef(0);
  const dispatch = useDispatch();

  const handleScroll = useCallback((event) => {
    const currentY = event.nativeEvent.contentOffset?.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const maxY = contentHeight - scrollViewHeight;
    
    // Check if we are at the top or the bottom of the ScrollView
    if (currentY <= 0 || currentY >= maxY) {
      dispatch(showTabBar());
    } else {
      // Compare current scroll position to the last recorded position
      if (currentY - lastYRef.current > 0) {
        dispatch(hideTabBar());
      } else {
        dispatch(showTabBar());
      }
    }
    
    // Update the lastY position with the current position
    lastYRef.current = currentY;
  }, [dispatch]);

  return { handleScroll };
}