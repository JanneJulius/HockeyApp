import { useDispatch, useSelector } from 'react-redux';
import { setStandings } from '../reducers/actions';


const stringCompareFnASC = (a, b) =>
  a.name.toUpperCase().localeCompare(b.name.toUpperCase());
const stringCompareFnDESC = (a, b) =>
  b.name.toUpperCase().localeCompare(a.name.toUpperCase());

export function useSort(division) {

  const standings = useSelector((state) => state.standings.standings);
  const { teams, sort} = standings[division];
  const dispatch = useDispatch();
  const teamRef = [...teams];

  const sortAndDispatch = (columnTitle) => {
  const initialSort= {"DIFF": undefined, "GA": undefined, "GF": undefined, "GP": undefined, "L": undefined, "OTL": undefined, "P": undefined, "W": undefined, "name": undefined, "rank": undefined}

  const isUndefined = sort[columnTitle] === undefined;
  if(isUndefined) {
    initialSort[columnTitle] = "ascending";

    if(columnTitle === 'name') {
      teamRef.sort(stringCompareFnASC);
    }
    else {
      teamRef.sort((a, b) => a[columnTitle] - b[columnTitle]);
    }
  }
  const isAscending = sort[columnTitle] === 'ascending';

  
  if(isAscending) {
    initialSort[columnTitle] = "descending";

    if(columnTitle === 'name') {
      teamRef.sort(stringCompareFnDESC);
    }
    else {
      teamRef.sort((a, b) => b[columnTitle] - a[columnTitle]);
    }
  }
  else {
    initialSort[columnTitle] = "ascending";
    if(columnTitle === 'name') {
      teamRef.sort(stringCompareFnASC);
    }
    else {
      teamRef.sort((a, b) => a[columnTitle] - b[columnTitle]);
    }
  }


  
  dispatch(setStandings({
    ...standings,
    [division]: {
      ...standings[division],
      teams: teamRef,
      sort: initialSort
    }
  }));

}

return { sortAndDispatch };

}
