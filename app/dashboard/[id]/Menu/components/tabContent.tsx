import React from 'react';
import MenuItemCard from './MenuItemCard';

interface SingalTabContentProps {
  menuItems: MenuItem[];
  menuId: number; // Add this to filter by menu_id
  id: string | string[];
  orderNumber: string;
}
// types.ts
export interface MenuItem {
  id: number;
  name: string;
  menu_id: number;
  money: number;
  description: string;
  switchOn: number;
  image:string;
}
const TabContent: React.FC<SingalTabContentProps> = ({ menuItems, menuId ,id,orderNumber}) => {
  // Filter items based on the provided menu_id
  const singalItems = menuItems.filter(item => item.menu_id === menuId);

  if (singalItems.length === 0) {
    return <div>No items found for this tab</div>;
  }

  return (
    
    <div
      className="grid grid-cols-5 gap-6 justify-items-center" // 設定每排 5 個項目並控制間距
      style={{ width: '100%' }} // 保證容器的寬度使用全寬
    >
      {singalItems.map(item => (
        
        <div
          key={item.id}
          style={{
            width: '150px', // 控制每個卡片的寬度，避免過窄
            textAlign: 'center',
          }}
        >
          <MenuItemCard item={item} id={id} orderNumber={orderNumber}/>
        </div>
      ))}
    </div>
  );
};

export default TabContent;