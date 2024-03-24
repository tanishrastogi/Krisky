import { useState } from 'react';
import style from './FilterSidebar.module.css';
import { Button, Input } from '../index';


const FilterSidebar = ({ filters, onFilterChange }) => {
  const [mActive, setMActive] = useState();
  const [wActive, setWActive] = useState();
  
  const productTypeOptions = ['Boots', 'Shoes', 'Sandals'];
  const brandOptions = ['Dr. Martens', 'Nike', 'Adidas', 'jordaar'];
  const sizeOptions = ['S', 'M', 'L'];
  const colorOptions = ['Black (10)', 'White (5)', 'Red (3)'];

  const handleCheckboxChange = (filterName: string, value: string) => {
    const currentFilters = filters[filterName] || [];

    if (currentFilters.includes(value)) {
      const updatedFilters = currentFilters.filter((filter: string) => filter !== value);
      onFilterChange(filterName, updatedFilters);
    } else {
      const updatedFilters = [...currentFilters, value];
      onFilterChange(filterName, updatedFilters);
    }
  };

  const handleGenderButtonClick = (gender: string) => {
    const genderFilterName = 'gender';
    if (gender === 'M') {
      setMActive(!mActive);
      onFilterChange(genderFilterName, mActive ? [] : [gender]);
    } else if (gender === 'F') {
      setWActive(!wActive);
      onFilterChange(genderFilterName, wActive ? [] : [gender]);
    }
  };

  return (
    <div className={style.filtersidebar}>
      <div className={style.CurrentFiltersContainer}>
        <h4 className={style.CurrentFiltersContainerHeading}>Current Filters</h4>

      </div>
      <div className={style.BodyTypeContainer}>
        <label className={style.BodyType}>Body Type:</label>
        <div className={style.buttons}>
          <Button
            className={style.Button}
            style={{ backgroundColor: mActive ? 'black' : 'white', color: mActive ? 'white' : 'black', width: '80px' }}
            onClick={() => handleGenderButtonClick('M')}
          >
            Men
          </Button>
          <Button
            className={style.Button}
            style={{ backgroundColor: wActive ? 'black' : 'white', color: wActive ? 'white' : 'black', width: '80px' }}
            onClick={() => handleGenderButtonClick('F')}
          >
            Women
          </Button>
        </div>
      </div>


      {[
        { filterName: 'category', options: productTypeOptions },
        { filterName: 'brand', options: brandOptions },
        { filterName: 'size', options: sizeOptions },
        { filterName: 'colors', options: colorOptions },
      ].map(({ filterName, options }) => (
        <div className={style.FilterNameContainer} key={filterName}>
          <label className={style.FilterName}>{filterName}:</label>
          <div>
            {options.map((option) => (
              <Input
                key={option}
                padding="5px"
                margin="5px"
                style={{ height: '20px', width: '20px', marginRight: '10px',}}
                type="checkbox"
                labelcheckbox={option}
                onChange={() => handleCheckboxChange(filterName, option)}
                checked={filters[filterName]?.includes(option) || false}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
