import React from 'react'

const recentlyViewedItems = [
    { id: 1, image: 'https://assets.target.com.au/transform/1711ec72-1d75-402e-8ed8-dffd743032b2/355_69284557_1-282F9D?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp', name: 'Plain Dyed Flannelette Sheet Set', price: '$35 - $60' },
    { id: 2, image: 'https://assets.target.com.au/transform/f3c5fa5e-06c7-4a9c-a80f-d97240bb9ef8/355_69298899_1-282E3B?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp', name: 'Plain Dyed Flannelette Sheet Set', price: '$35 - $60' },
    { id: 3, image: 'https://assets.target.com.au/transform/1711ec72-1d75-402e-8ed8-dffd743032b2/355_69284557_1-282F9D?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp', name: 'Plain Dyed Flannelette Sheet Set', price: '$35 - $60' },
    { id: 4, image: 'https://assets.target.com.au/transform/f3c5fa5e-06c7-4a9c-a80f-d97240bb9ef8/355_69298899_1-282E3B?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp', name: 'Plain Dyed Flannelette Sheet Set', price: '$35 - $60' },
    { id: 5, image: 'https://assets.target.com.au/transform/1711ec72-1d75-402e-8ed8-dffd743032b2/355_69284557_1-282F9D?io=transform%3Afit%2Cwidth%3A1400%2Cheight%3A1600&quality=90&output=webp', name: 'Plain Dyed Flannelette Sheet Set', price: '$35 - $60' }
  ];
  
  const RecentViewProduct = () => {
    return (
        <div className="mt-8 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Recently Viewed Items</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {recentlyViewedItems.map(item => (
            <div key={item.id} className="w-48">
              <img src={item.image} alt={`Recently Viewed Item ${item.id}`} className="w-full mb-2" />
              <p className="text-sm">{item.name}</p>
              <p className="text-sm font-bold">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default RecentViewProduct