import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';
import { colourOptions } from '../data';
import getCompanies from '../../state/actions'

const filterColors = (inputValue: string) => {
  return colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  });

export default class WithPromises extends Component {
  render() {
    return (
      <AsyncSelect cacheOptions defaultOptions loadOptions={promiseOptions} />
    );
  }
}

	
// company search function
useEffect(() => {
  if (searchTerm.length >= 3) {
    const results = companies.filter(company =>
      company.company_name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    if (results.length === 0) {
      setNoCompany(true);
    } else {
      setNoCompany(false);
    }
  }
}, [searchTerm, companies]);


onChange={e => setSearchTerm(e.target.value)}
											<>
											<datalist id='company_name'>
												{searchResults.map(company => (
													<option value={company.company_name} key={company.id}>
														{company.company_name}
													</option>
												))}
											</datalist>
											{noCompany ? (
												<>
													<Link mb='3' color='grey' href='/add-company'>
														Oops, you need to add that company!
													</Link>
												</>
											) : (