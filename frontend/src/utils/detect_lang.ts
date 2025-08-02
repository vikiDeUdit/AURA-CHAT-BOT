export function detectItemSelectionPara(paragraph: string): boolean {
  return paragraph.includes('ITEM_CARDS_DATA:') || paragraph.includes('Please select the item');
}

export function extractItemsFromMessage(message: string): { MODEL_NAME: string, MAT_CODE: string }[] {
  try {
    const jsonStart = message.indexOf('[');
    const jsonEnd = message.lastIndexOf(']') + 1;
    
    if (jsonStart === -1 || jsonEnd === 0) return [];
    
    const jsonStr = message.substring(jsonStart, jsonEnd);
    const itemsData = JSON.parse(jsonStr);
    
    return itemsData.map((item: any) => ({
      MODEL_NAME: item.name,
      MAT_CODE: item.code
    }));
  } catch (error) {
    console.error('Error parsing items from message:', error);
    return [];
  }
}
