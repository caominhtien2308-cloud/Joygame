/**
 * ===================================================================
 * ĂN KHỎE DÁNG ĐẸP - CORE JAVASCRIPT APPLICATION
 * Senior Frontend Developer & UI/UX Implementation
 * ===================================================================
 */

'use strict';

// -------------------------------------------------------------------
// 1. MASTER INGREDIENT DATABASE WITH UNIT PRICES (VNĐ)
// -------------------------------------------------------------------
const DEFAULT_INGREDIENTS = {
  tom_tuoi: {
    id: 'tom_tuoi',
    name: 'Tôm tươi (bỏ đầu, còn vỏ)',
    category: 'meat',
    unit: 'kg',
    unitPrice: 160000,
    retailPack: 'Khay 500g (~80.000đ)',
    note: 'Mua tôm thẻ hoặc tôm sú tươi'
  },
  uc_ga: {
    id: 'uc_ga',
    name: 'Ức gà phi lê',
    category: 'meat',
    unit: 'kg',
    unitPrice: 80000,
    retailPack: 'Khay 500g (~40.000đ)',
    note: 'Ức gà CP sạch mỡ, giàu đạm'
  },
  thit_heo_nac: {
    id: 'thit_heo_nac',
    name: 'Thịt heo nạc (thăn/mông)',
    category: 'meat',
    unit: 'kg',
    unitPrice: 110000,
    retailPack: 'Miếng 300g (~33.000đ)',
    note: 'Thịt heo tươi ít mỡ'
  },
  ca_loc: {
    id: 'ca_loc',
    name: 'Cá phi lê (cá lóc/cá hồi/cá basa)',
    category: 'meat',
    unit: 'kg',
    unitPrice: 120000,
    retailPack: 'Khay 300g (~36.000đ)',
    note: 'Cá tươi hấp ngọt thịt'
  },
  trung_ga: {
    id: 'trung_ga',
    name: 'Trứng gà ta / công nghiệp',
    category: 'dairy',
    unit: 'quả',
    unitPrice: 3000,
    retailPack: 'Hộp 10 quả (30.000đ)',
    note: 'Bảo quản ngăn mát tủ lạnh'
  },
  sua_tuoi: {
    id: 'sua_tuoi',
    name: 'Sữa tươi không đường',
    category: 'dairy',
    unit: 'hộp',
    unitPrice: 8500,
    retailPack: 'Lốc 4 hộp 180ml (34.000đ)',
    note: 'Sữa tươi tiệt trùng Vinamilk/TH'
  },
  sua_chua: {
    id: 'sua_chua',
    name: 'Sữa chua không đường',
    category: 'dairy',
    unit: 'hũ',
    unitPrice: 7000,
    retailPack: 'Lốc 4 hũ 100g (28.000đ)',
    note: 'Bổ sung men vi sinh hỗ trợ tiêu hóa'
  },
  dau_phu: {
    id: 'dau_phu',
    name: 'Đậu phụ trắng (đậu hũ)',
    category: 'meat',
    unit: 'bìa',
    unitPrice: 4000,
    retailPack: 'Miếng 150g (4.000đ)',
    note: 'Đậu phụ sạch làm từ đậu nành'
  },
  gao_trang: {
    id: 'gao_trang',
    name: 'Gạo tẻ / Gạo lứt (đã nấu)',
    category: 'carb',
    unit: 'kg',
    unitPrice: 22000,
    retailPack: 'Túi 5kg (~110.000đ)',
    note: '150g cơm chín ~ 60g gạo khô'
  },
  khoai_lang: {
    id: 'khoai_lang',
    name: 'Khoai lang Nhật luộc',
    category: 'carb',
    unit: 'củ',
    unitPrice: 5000,
    retailPack: 'Túi 1kg (~20.000đ / 4 củ)',
    note: 'Tinh bột hấp thu chậm, giàu chất xơ'
  },
  banh_mi: {
    id: 'banh_mi',
    name: 'Bánh mì truyền thống / nguyên cám',
    category: 'carb',
    unit: 'ổ',
    unitPrice: 5000,
    retailPack: '1 ổ (5.000đ)',
    note: 'Chọn loại không phết bơ ngọt'
  },
  chuoi: {
    id: 'chuoi',
    name: 'Chuối tiêu / chuối ngự chín',
    category: 'veggie',
    unit: 'quả',
    unitPrice: 3000,
    retailPack: 'Nải 1-1.5kg (~25.000đ)',
    note: 'Bổ sung kali, năng lượng tức thì'
  },
  tao_do: {
    id: 'tao_do',
    name: 'Táo đỏ nhỏ',
    category: 'veggie',
    unit: 'quả',
    unitPrice: 8000,
    retailPack: 'Túi 1kg (~40.000đ / 5 quả)',
    note: 'Táo giòn ngọt, giàu vitamin C'
  },
  du_du: {
    id: 'du_du',
    name: 'Đu đủ chín',
    category: 'veggie',
    unit: 'phần',
    unitPrice: 6000,
    retailPack: '1 quả 800g (~20.000đ)',
    note: 'Thanh mát, tốt cho làn da'
  },
  trai_cay_mix: {
    id: 'trai_cay_mix',
    name: 'Trái cây theo mùa (ổi/mận/dưa hấu)',
    category: 'veggie',
    unit: 'phần',
    unitPrice: 6000,
    retailPack: 'Khay hoa quả (~15.000đ)',
    note: 'Trái cây tươi ít đường'
  },
  bap_cai: {
    id: 'bap_cai',
    name: 'Bắp cải trắng luộc',
    category: 'veggie',
    unit: 'phần',
    unitPrice: 4000,
    retailPack: 'Bắp 800g (~12.000đ)',
    note: 'Chất xơ cao, ngọt tự nhiên'
  },
  su_hao_ca_rot: {
    id: 'su_hao_ca_rot',
    name: 'Su hào, cà rốt thái thanh',
    category: 'veggie',
    unit: 'phần',
    unitPrice: 5000,
    retailPack: 'Combo rau củ (~12.000đ)',
    note: 'Luộc chấm muối vừng hoặc nước kho'
  },
  cai_thia: {
    id: 'cai_thia',
    name: 'Cải thìa (cải chíp) luộc',
    category: 'veggie',
    unit: 'phần',
    unitPrice: 4000,
    retailPack: 'Bó 400g (~10.000đ)',
    note: 'Rau xanh thanh mát, giàu canxi'
  },
  rau_muong: {
    id: 'rau_muong',
    name: 'Rau muống luộc lấy nước canh chanh',
    category: 'veggie',
    unit: 'phần',
    unitPrice: 4000,
    retailPack: 'Mớ rau muống (~8.000đ)',
    note: 'Món ăn thanh nhiệt quốc dân'
  },
  bi_dao: {
    id: 'bi_dao',
    name: 'Bí đao (canh bí đao thịt nạc/trứng)',
    category: 'veggie',
    unit: 'phần',
    unitPrice: 4000,
    retailPack: '1 quả bí đao (~12.000đ)',
    note: 'Thanh lọc, tiêu phù mỡ thừa'
  },
  bi_do: {
    id: 'bi_do',
    name: 'Bí đỏ nấu canh thanh',
    category: 'veggie',
    unit: 'phần',
    unitPrice: 4000,
    retailPack: 'Khúc bí đỏ 400g (~8.000đ)',
    note: 'Giàu vitamin A, tốt cho mắt'
  },
  rau_xanh_mix: {
    id: 'rau_xanh_mix',
    name: 'Rau xanh luộc / Canh rau hỗn hợp',
    category: 'veggie',
    unit: 'phần',
    unitPrice: 4000,
    retailPack: 'Bó rau xanh (~8.000đ)',
    note: 'Rau sạch theo mùa'
  },
  ca_chua: {
    id: 'ca_chua',
    name: 'Cà chua chín mọng',
    category: 'veggie',
    unit: 'quả',
    unitPrice: 2000,
    retailPack: 'Túi 500g (~10.000đ)',
    note: 'Dùng làm sốt đậu hoặc nấu canh'
  },
  rau_dua: {
    id: 'rau_dua',
    name: 'Dưa leo, rau mùi ăn kèm',
    category: 'veggie',
    unit: 'phần',
    unitPrice: 2000,
    retailPack: 'Bó rau thơm dưa leo (~6.000đ)',
    note: 'Ăn kèm bánh mì hoặc đồ luộc'
  },
  dau_phong: {
    id: 'dau_phong',
    name: 'Đậu phộng (lạc rang)',
    category: 'seasoning',
    unit: 'phần',
    unitPrice: 2000,
    retailPack: 'Gói 100g (~8.000đ)',
    note: 'Cung cấp chất béo tốt không bão hòa'
  },
  muoi_gia_vi: {
    id: 'muoi_gia_vi',
    name: 'Gia vị cơ bản (muối, hạt tiêu, gừng)',
    category: 'seasoning',
    unit: 'ít',
    unitPrice: 500,
    retailPack: 'Gói gia vị dùng nhiều lần',
    note: 'Chỉ nêm lượng rất nhỏ thanh đạm'
  }
};

// -------------------------------------------------------------------
// 2. REALISTIC 7-DAY MEAL PLAN WITH INGREDIENT BREAKDOWNS & RECIPES
// -------------------------------------------------------------------
const DEFAULT_MEALS_DATA = [
  // ================= THỨ 2 =================
  {
    id: 't2_sang',
    day: 'thu2',
    mealType: 'sang',
    mealTitle: 'Bữa sáng',
    name: '2 trứng luộc nguyên quả + 1 hộp sữa không đường',
    shortDesc: '2 trứng luộc + 1 hộp sữa không đường',
    tagline: 'Khởi đầu ngày mới nhẹ nhàng • Giàu protein và canxi',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80',
    prepTime: '10 phút',
    difficulty: 'Rất dễ',
    calories: 270,
    ingredients: [
      { id: 'trung_ga', name: 'Trứng gà', amount: 2, unit: 'quả', displayAmount: '2 quả' },
      { id: 'sua_tuoi', name: 'Sữa tươi không đường', amount: 1, unit: 'hộp', displayAmount: '1 hộp 180ml' },
      { id: 'muoi_gia_vi', name: 'Muối tinh luộc trứng', amount: 1, unit: 'ít', displayAmount: '1 nhúm nhỏ' }
    ],
    steps: [
      { title: 'Luộc trứng', desc: 'Cho 2 quả trứng gà vào nồi nước lạnh ngập trứng cùng chút muối. Đun sôi rồi hạ lửa vừa luộc trong 7-8 phút để trứng chín tới lòng đào dẻo.' },
      { title: 'Làm nguội', desc: 'Vớt trứng ra ngâm vào bát nước mát trong 2 phút để dễ bóc vỏ.' },
      { title: 'Thưởng thức', desc: 'Bóc vỏ trứng, ăn kèm 1 hộp sữa tươi không đường ấm hoặc mát.' }
    ],
    tips: [
      'Cho chút muối hoặc giấm vào nước luộc giúp vỏ trứng không bị nứt và dễ bóc hơn.',
      'Sữa không đường giúp bổ sung năng lượng mà không làm tăng đường huyết đột ngột.'
    ]
  },
  {
    id: 't2_trua',
    day: 'thu2',
    mealType: 'trua',
    mealTitle: 'Bữa trưa',
    name: '150g cơm chín + 120g ức gà + su hào, cà rốt luộc',
    shortDesc: '150g cơm + 120g ức gà + su hào cà rốt luộc',
    tagline: 'Cân bằng carb và protein • Ít mỡ no lâu',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80',
    prepTime: '20 phút',
    difficulty: 'Dễ',
    calories: 460,
    ingredients: [
      { id: 'gao_trang', name: 'Gạo (nấu cơm 150g)', amount: 0.065, unit: 'kg', displayAmount: '150g cơm chín' },
      { id: 'uc_ga', name: 'Ức gà phi lê', amount: 0.12, unit: 'kg', displayAmount: '120g' },
      { id: 'su_hao_ca_rot', name: 'Su hào, cà rốt', amount: 1, unit: 'phần', displayAmount: '1 đĩa vừa (~200g)' },
      { id: 'muoi_gia_vi', name: 'Gừng, muối luộc gà', amount: 1, unit: 'ít', displayAmount: 'Vài lát gừng' }
    ],
    steps: [
      { title: 'Sơ chế ức gà & rau củ', desc: 'Ức gà rửa sạch với muối, khứa nhẹ. Su hào gọt vỏ cắt con chì, cà rốt tỉa hoa thái lát vừa ăn.' },
      { title: 'Luộc gà', desc: 'Đun sôi nước với lát gừng và xíu muối, cho ức gà vào luộc lửa vừa trong 8-10 phút. Tắt bếp ngâm thêm 3 phút cho gà mọng nước rồi vớt ra xé hoặc thái lát.' },
      { title: 'Luộc rau củ', desc: 'Tận dụng nước luộc gà đang sôi, thả su hào cà rốt vào luộc 3-5 phút cho chín giòn ngọt.' },
      { title: 'Bày đĩa', desc: 'Xới 1 bát con cơm chín (khoảng 150g), xếp thịt gà và rau củ bên cạnh.' }
    ],
    tips: [
      'Không luộc ức gà quá kỹ để thịt không bị khô xơ.',
      'Nước luộc rau củ thơm gừng có thể dùng làm canh uống thanh mát.'
    ]
  },
  {
    id: 't2_phu',
    day: 'thu2',
    mealType: 'phu',
    mealTitle: 'Bữa phụ',
    name: '1 quả chuối + 1 hũ sữa chua',
    shortDesc: '1 quả chuối + 1 hũ sữa chua',
    tagline: 'Bổ sung lợi khuẩn • Chống đói buổi chiều hiệu quả',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    prepTime: '2 phút',
    difficulty: 'Rất dễ',
    calories: 175,
    ingredients: [
      { id: 'chuoi', name: 'Chuối tiêu chín', amount: 1, unit: 'quả', displayAmount: '1 quả (~100g)' },
      { id: 'sua_chua', name: 'Sữa chua không đường', amount: 1, unit: 'hũ', displayAmount: '1 hũ 100g' }
    ],
    steps: [
      { title: 'Chuẩn bị', desc: 'Bóc vỏ chuối, có thể thái khoanh tròn hoặc ăn trực tiếp.' },
      { title: 'Trộn ăn kèm', desc: 'Múc từng thìa sữa chua ăn cùng khoanh chuối để vị chua ngọt hòa quyện thơm ngon.' }
    ],
    tips: [
      'Ăn vào khung giờ 15h30 - 16h30 để giữ đường huyết ổn định, tránh ăn quá nhiều vào bữa tối.'
    ]
  },
  {
    id: 't2_toi',
    day: 'thu2',
    mealType: 'toi',
    mealTitle: 'Bữa tối',
    name: '150g cơm chín + 150g đậu phụ sốt cà chua + canh rau',
    shortDesc: '150g cơm + 150g đậu phụ sốt cà chua + canh rau',
    tagline: 'Bữa tối thanh đạm • Dễ tiêu hóa • Đậu phụ giàu isoflavone',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    prepTime: '20 phút',
    difficulty: 'Dễ',
    calories: 420,
    ingredients: [
      { id: 'gao_trang', name: 'Gạo nấu cơm', amount: 0.065, unit: 'kg', displayAmount: '150g cơm chín' },
      { id: 'dau_phu', name: 'Đậu phụ trắng', amount: 1, unit: 'bìa', displayAmount: '1 bìa 150g' },
      { id: 'ca_chua', name: 'Cà chua chín', amount: 2, unit: 'quả', displayAmount: '2 quả nhỏ' },
      { id: 'rau_xanh_mix', name: 'Rau xanh nấu canh', amount: 1, unit: 'phần', displayAmount: '1 bát canh' },
      { id: 'muoi_gia_vi', name: 'Hành hoa, gia vị ít dầu', amount: 1, unit: 'ít', displayAmount: 'Gia vị cơ bản' }
    ],
    steps: [
      { title: 'Sơ chế đậu', desc: 'Đậu phụ rửa nhẹ, cắt miếng vuông vừa ăn. Có thể áp chảo không dầu bằng chảo chống dính hoặc giữ tươi.' },
      { title: 'Làm sốt cà chua', desc: 'Cà chua băm nhỏ, phi thơm với chút xíu dầu ăn hoặc nước, đun mềm nhừ tạo sốt sệt.' },
      { title: 'Sốt đậu', desc: 'Thả đậu vào đảo nhẹ cho ngấm sốt cà chua trong 3-5 phút, rắc hành hoa rồi tắt bếp.' },
      { title: 'Nấu canh', desc: 'Đun sôi nước, thả rau xanh vào nấu chín tới, nêm chút muối thanh nhẹ.' }
    ],
    tips: [
      'Không dùng nhiều dầu ăn khi làm sốt để giữ món ăn thuần Eat Clean thanh mát.'
    ]
  },

  // ================= THỨ 3 =================
  {
    id: 't3_sang',
    day: 'thu3',
    mealType: 'sang',
    mealTitle: 'Bữa sáng',
    name: '1 củ khoai lang vừa + 2 trứng luộc',
    shortDesc: '1 củ khoai lang + 2 trứng luộc',
    tagline: 'Bộ đôi kinh điển của Eat Clean • Bền bỉ năng lượng cả buổi sáng',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    prepTime: '15 phút',
    difficulty: 'Rất dễ',
    calories: 310,
    ingredients: [
      { id: 'khoai_lang', name: 'Khoai lang luộc', amount: 1, unit: 'củ', displayAmount: '1 củ vừa (~150g)' },
      { id: 'trung_ga', name: 'Trứng gà luộc', amount: 2, unit: 'quả', displayAmount: '2 quả' }
    ],
    steps: [
      { title: 'Luộc khoai & trứng', desc: 'Khoai lang rửa sạch vỏ, cho vào nồi hấp hoặc luộc khoảng 15 phút. Trứng cho vào luộc 7 phút.' },
      { title: 'Thưởng thức', desc: 'Bóc vỏ khoai và trứng, dùng khi còn ấm nóng kèm 1 cốc nước ấm.' }
    ],
    tips: [
      'Có thể luộc sẵn khoai từ tối hôm trước, sáng chỉ cần quay nóng 1 phút.'
    ]
  },
  {
    id: 't3_trua',
    day: 'thu3',
    mealType: 'trua',
    mealTitle: 'Bữa trưa',
    name: '150g cơm chín + 120g thịt heo nạc + bắp cải luộc',
    shortDesc: '150g cơm + 120g thịt nạc luộc + bắp cải',
    tagline: 'Vị ngọt thanh từ thịt nạc luộc và bắp cải chấm trứng',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepTime: '20 phút',
    difficulty: 'Dễ',
    calories: 450,
    ingredients: [
      { id: 'gao_trang', name: 'Cơm chín', amount: 0.065, unit: 'kg', displayAmount: '150g cơm' },
      { id: 'thit_heo_nac', name: 'Thịt heo nạc thăn', amount: 0.12, unit: 'kg', displayAmount: '120g' },
      { id: 'bap_cai', name: 'Bắp cải trắng luộc', amount: 1, unit: 'phần', displayAmount: '1/4 bắp (~200g)' },
      { id: 'muoi_gia_vi', name: 'Hành tím, muối', amount: 1, unit: 'ít', displayAmount: '1 ít gia vị' }
    ],
    steps: [
      { title: 'Luộc thịt', desc: 'Thịt nạc rửa sạch, luộc trong nước sôi có củ hành tím đập dập khoảng 12-15 phút. Vớt ra thái lát mỏng.' },
      { title: 'Luộc bắp cải', desc: 'Bắp cải cắt miếng vừa, rửa sạch rồi luộc trong nước luộc thịt 3-4 phút cho vừa chín tới ngọt giòn.' },
      { title: 'Bày bữa ăn', desc: 'Ăn cùng cơm nóng và đĩa thịt nạc bắp cải thơm ngọt.' }
    ],
    tips: [
      'Bắp cải luộc không nên đậy nắp quá lâu để giữ màu xanh tươi đẹp mắt.'
    ]
  },
  {
    id: 't3_phu',
    day: 'thu3',
    mealType: 'phu',
    mealTitle: 'Bữa phụ',
    name: '1 ly sữa không đường + 1 phần trái cây nhỏ',
    shortDesc: '1 ly sữa không đường + 1 phần trái cây nhỏ',
    tagline: 'Giải khát nhẹ nhàng • Bổ sung vitamin khoáng chất',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    prepTime: '3 phút',
    difficulty: 'Rất dễ',
    calories: 160,
    ingredients: [
      { id: 'sua_tuoi', name: 'Sữa tươi không đường', amount: 1, unit: 'hộp', displayAmount: '1 hộp 180ml' },
      { id: 'trai_cay_mix', name: 'Trái cây theo mùa', amount: 1, unit: 'phần', displayAmount: '1 đĩa nhỏ 100g' }
    ],
    steps: [
      { title: 'Chuẩn bị', desc: 'Rửa sạch trái cây (ổi hoặc dưa hấu/táo), cắt miếng vừa ăn và uống kèm hộp sữa tươi mát lành.' }
    ],
    tips: [
      'Nên chọn trái cây ít ngọt như ổi, mận hoặc thanh long để kiểm soát đường.'
    ]
  },
  {
    id: 't3_toi',
    day: 'thu3',
    mealType: 'toi',
    mealTitle: 'Bữa tối',
    name: '150g cơm chín + 120–150g tôm luộc + cải thìa luộc',
    shortDesc: '150g cơm + 120-150g tôm luộc + cải thìa luộc',
    tagline: 'Món ăn best-seller • Siêu giàu protein nạc • Tốt cho vóc dáng',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    prepTime: '15 phút',
    difficulty: 'Dễ',
    calories: 390,
    ingredients: [
      { id: 'gao_trang', name: 'Cơm chín', amount: 0.065, unit: 'kg', displayAmount: '150g cơm' },
      { id: 'tom_tuoi', name: 'Tôm tươi', amount: 0.15, unit: 'kg', displayAmount: '120-150g' },
      { id: 'cai_thia', name: 'Cải thìa (cải chíp)', amount: 1, unit: 'phần', displayAmount: '1 bó nhỏ' },
      { id: 'muoi_gia_vi', name: 'Gừng, muối luộc', amount: 1, unit: 'ít', displayAmount: '1 lát gừng, chút muối' }
    ],
    steps: [
      { title: 'Sơ chế tôm', desc: 'Rửa sạch tôm tươi dưới vòi nước, cắt bỏ râu và đầu nếu muốn, có thể rút chỉ đen trên sống lưng.' },
      { title: 'Luộc tôm', desc: 'Đun sôi nước với chút muối và vài lát gừng đập dập. Thả tôm vào luộc 2-4 phút đến khi tôm cong đỏ cam đẹp mắt.' },
      { title: 'Luộc cải thìa', desc: 'Vớt tôm ra để ráo. Thả cải thìa vào chần 2 phút là chín giòn ngọt.' },
      { title: 'Thưởng thức', desc: 'Chấm tôm với chút nước mắm chanh tiêu ớt thanh nhẹ ăn cùng cơm nóng.' }
    ],
    tips: [
      'Không luộc tôm quá lâu để thịt tôm giữ được độ giòn ngọt và không bị khô xơ.',
      'Tôm là nguồn protein nạc hàng đầu, hầu như không chứa chất béo bão hòa.'
    ]
  },

  // ================= THỨ 4 =================
  {
    id: 't4_sang',
    day: 'thu4',
    mealType: 'sang',
    mealTitle: 'Bữa sáng',
    name: '1 ổ bánh mì trứng + rau dưa',
    shortDesc: '1 ổ bánh mì trứng + dưa leo rau thơm',
    tagline: 'Hương vị Việt Nam thân thuộc • Nhanh gọn • No lâu',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
    prepTime: '10 phút',
    difficulty: 'Dễ',
    calories: 330,
    ingredients: [
      { id: 'banh_mi', name: 'Bánh mì giòn', amount: 1, unit: 'ổ', displayAmount: '1 ổ' },
      { id: 'trung_ga', name: 'Trứng gà ốp la/tráng ít dầu', amount: 1, unit: 'quả', displayAmount: '1-2 quả' },
      { id: 'rau_dua', name: 'Dưa leo, rau mùi', amount: 1, unit: 'phần', displayAmount: 'Vài lát dưa leo' },
      { id: 'muoi_gia_vi', name: 'Tiêu, nước tương nhẹ', amount: 1, unit: 'ít', displayAmount: '1 chút' }
    ],
    steps: [
      { title: 'Ốp trứng', desc: 'Dùng chảo chống dính với 1/2 thìa cà phê dầu hoặc không dầu, ốp chín trứng lòng đào hoặc chín tới.' },
      { title: 'Kẹp bánh mì', desc: 'Rạch dọc ổ bánh mì, xếp dưa leo, rau mùi, kẹp trứng vào và rắc xíu tiêu thơm lừng.' }
    ],
    tips: [
      'Không cho thêm bơ sốt mayonnaise ngọt béo để kiểm soát calo tối đa.'
    ]
  },
  {
    id: 't4_trua',
    day: 'thu4',
    mealType: 'trua',
    mealTitle: 'Bữa trưa',
    name: '150g cơm chín + 120g ức gà + rau luộc',
    shortDesc: '150g cơm + 120g ức gà + rau xanh luộc',
    tagline: 'Giữ cơ giảm mỡ • Chế biến nhanh gọn',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80',
    prepTime: '18 phút',
    difficulty: 'Dễ',
    calories: 440,
    ingredients: [
      { id: 'gao_trang', name: 'Cơm chín', amount: 0.065, unit: 'kg', displayAmount: '150g cơm' },
      { id: 'uc_ga', name: 'Ức gà luộc/áp chảo', amount: 0.12, unit: 'kg', displayAmount: '120g' },
      { id: 'rau_xanh_mix', name: 'Rau luộc theo mùa', amount: 1, unit: 'phần', displayAmount: '1 đĩa rau' },
      { id: 'muoi_gia_vi', name: 'Muối, gừng', amount: 1, unit: 'ít', displayAmount: 'Gia vị cơ bản' }
    ],
    steps: [
      { title: 'Chế biến gà & rau', desc: 'Ức gà thái lát ướp xíu tiêu gừng rồi áp chảo lửa vừa hoặc luộc chín. Luộc thêm đĩa rau xanh giòn mát.' }
    ],
    tips: [
      'Có thể áp chảo ức gà với chút bột tỏi để dậy mùi thơm hấp dẫn hơn.'
    ]
  },
  {
    id: 't4_phu',
    day: 'thu4',
    mealType: 'phu',
    mealTitle: 'Bữa phụ',
    name: '1 hũ sữa chua + 1 quả chuối nhỏ',
    shortDesc: '1 hũ sữa chua + 1 quả chuối nhỏ',
    tagline: 'Nạp năng lượng tức thì • Tiêu hóa trơn tru',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    prepTime: '2 phút',
    difficulty: 'Rất dễ',
    calories: 170,
    ingredients: [
      { id: 'sua_chua', name: 'Sữa chua không đường', amount: 1, unit: 'hũ', displayAmount: '1 hũ' },
      { id: 'chuoi', name: 'Chuối nhỏ', amount: 1, unit: 'quả', displayAmount: '1 quả' }
    ],
    steps: [
      { title: 'Thưởng thức', desc: 'Thái lát chuối vào bát sữa chua và thưởng thức lạnh mát sảng khoái.' }
    ],
    tips: ['Bảo quản sữa chua ngăn mát tủ lạnh, không để đông đá làm mất men vi sinh.']
  },
  {
    id: 't4_toi',
    day: 'thu4',
    mealType: 'toi',
    mealTitle: 'Bữa tối',
    name: '150g cơm chín + 2 trứng luộc + canh bí đao + rau',
    shortDesc: '150g cơm + 2 trứng luộc + canh bí đao',
    tagline: 'Canh bí đao thanh nhiệt • Giúp cơ thể nhẹ nhõm trước khi ngủ',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80',
    prepTime: '20 phút',
    difficulty: 'Dễ',
    calories: 410,
    ingredients: [
      { id: 'gao_trang', name: 'Cơm chín', amount: 0.065, unit: 'kg', displayAmount: '150g cơm' },
      { id: 'trung_ga', name: 'Trứng gà luộc', amount: 2, unit: 'quả', displayAmount: '2 quả' },
      { id: 'bi_dao', name: 'Bí đao thái lát', amount: 1, unit: 'phần', displayAmount: '1/3 quả (~200g)' },
      { id: 'rau_xanh_mix', name: 'Rau xanh ăn kèm', amount: 1, unit: 'phần', displayAmount: '1 đĩa rau nhỏ' },
      { id: 'muoi_gia_vi', name: 'Hành hoa, muối canh', amount: 1, unit: 'ít', displayAmount: 'Chút gia vị' }
    ],
    steps: [
      { title: 'Nấu canh bí đao', desc: 'Đun sôi nước, cho bí đao thái mỏng vào nấu 4-5 phút đến khi bí trong, nêm chút muối và rắc hành hoa thơm.' },
      { title: 'Luộc trứng', desc: 'Luộc 2 quả trứng gà 7 phút, bóc vỏ ăn cùng cơm nóng và bát canh bí ngọt mát.' }
    ],
    tips: ['Bí đao chứa nhiều nước và khoáng chất, là thần dược tiêu trừ mỡ thừa và tích nước.']
  },

  // ================= THỨ 5 =================
  {
    id: 't5_sang',
    day: 'thu5',
    mealType: 'sang',
    mealTitle: 'Bữa sáng',
    name: 'Sinh tố chuối + táo nhỏ + sữa không đường + sữa chua không đường',
    shortDesc: 'Smoothie chuối táo + sữa chua sữa hạt',
    tagline: 'Ly sinh tố mát lành • Giàu enzym tự nhiên • Đẹp da sáng dáng',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
    prepTime: '8 phút',
    difficulty: 'Dễ',
    calories: 290,
    ingredients: [
      { id: 'chuoi', name: 'Chuối chín', amount: 1, unit: 'quả', displayAmount: '1 quả' },
      { id: 'tao_do', name: 'Táo đỏ nhỏ', amount: 1, unit: 'quả', displayAmount: '1 quả nhỏ' },
      { id: 'sua_tuoi', name: 'Sữa tươi không đường', amount: 0.8, unit: 'hộp', displayAmount: '150ml' },
      { id: 'sua_chua', name: 'Sữa chua không đường', amount: 1, unit: 'hũ', displayAmount: '1 hũ' }
    ],
    steps: [
      { title: 'Sơ chế hoa quả', desc: 'Táo rửa sạch ngâm muối, để cả vỏ hoặc gọt vỏ tùy thích, cắt miếng nhỏ bỏ hạt. Chuối bóc vỏ cắt khúc.' },
      { title: 'Xay sinh tố', desc: 'Cho chuối, táo, sữa chua và sữa tươi vào máy xay sinh tố, xay nhuyễn mịn trong 45 giây.' },
      { title: 'Thưởng thức', desc: 'Rót ra ly thưởng thức ngay ly sinh tố sánh mịn thơm lừng tự nhiên không cần đường.' }
    ],
    tips: [
      'Có thể cho chuối vào ngăn đông trước khi xay để sinh tố sánh đặc như kem.'
    ]
  },
  {
    id: 't5_trua',
    day: 'thu5',
    mealType: 'trua',
    mealTitle: 'Bữa trưa',
    name: '150g cơm chín + 120–150g tôm luộc + rau luộc',
    shortDesc: '150g cơm + 120-150g tôm luộc + rau luộc',
    tagline: 'Đậm đà hương vị hải sản • Nhẹ bụng cả buổi chiều làm việc',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    prepTime: '15 phút',
    difficulty: 'Dễ',
    calories: 385,
    ingredients: [
      { id: 'gao_trang', name: 'Cơm chín', amount: 0.065, unit: 'kg', displayAmount: '150g cơm' },
      { id: 'tom_tuoi', name: 'Tôm tươi', amount: 0.15, unit: 'kg', displayAmount: '120-150g' },
      { id: 'rau_xanh_mix', name: 'Rau xanh theo mùa luộc', amount: 1, unit: 'phần', displayAmount: '1 đĩa rau đầy' },
      { id: 'muoi_gia_vi', name: 'Gừng, muối luộc', amount: 1, unit: 'ít', displayAmount: 'Chút muối' }
    ],
    steps: [
      { title: 'Luộc tôm và rau', desc: 'Đun sôi nước với gừng và muối, luộc tôm 3 phút vớt ra, tiếp tục thả rau xanh vào luộc chín.' }
    ],
    tips: ['Tôm chín tới giữ được nước ngọt và vị giòn sần sật.']
  },
  {
    id: 't5_phu',
    day: 'thu5',
    mealType: 'phu',
    mealTitle: 'Bữa phụ',
    name: '1 củ khoai lang nhỏ hoặc 1 quả chuối',
    shortDesc: '1 củ khoai lang nhỏ hoặc 1 quả chuối',
    tagline: 'Cứu cánh cơn thèm ăn xế chiều',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    prepTime: '2 phút',
    difficulty: 'Rất dễ',
    calories: 120,
    ingredients: [
      { id: 'khoai_lang', name: 'Khoai lang hấp chín', amount: 1, unit: 'củ', displayAmount: '1 củ nhỏ (~100g)' }
    ],
    steps: [
      { title: 'Ăn nhẹ', desc: 'Dùng củ khoai lang nhỏ luộc thơm ngọt kèm tách trà xanh ấm.' }
    ],
    tips: ['Trà xanh ấm cùng khoai lang giúp đốt calo hiệu quả và tỉnh táo làm việc.']
  },
  {
    id: 't5_toi',
    day: 'thu5',
    mealType: 'toi',
    mealTitle: 'Bữa tối',
    name: '150g cơm chín + 120g ức gà + canh rau',
    shortDesc: '150g cơm + 120g ức gà + canh rau',
    tagline: 'Tối thiểu hóa chất béo xấu • Tối đa hóa khả năng phục hồi cơ bắp',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80',
    prepTime: '20 phút',
    difficulty: 'Dễ',
    calories: 430,
    ingredients: [
      { id: 'gao_trang', name: 'Cơm chín', amount: 0.065, unit: 'kg', displayAmount: '150g cơm' },
      { id: 'uc_ga', name: 'Ức gà', amount: 0.12, unit: 'kg', displayAmount: '120g' },
      { id: 'rau_xanh_mix', name: 'Rau nấu canh', amount: 1, unit: 'phần', displayAmount: '1 bát canh' },
      { id: 'muoi_gia_vi', name: 'Muối, tiêu', amount: 1, unit: 'ít', displayAmount: '1 ít' }
    ],
    steps: [
      { title: 'Nấu bữa tối', desc: 'Ức gà luộc hoặc xào áp chảo ít dầu với chút tiêu, nấu kèm bát canh rau thanh ngọt.' }
    ],
    tips: ['Ăn tối trước 19h30 để hệ tiêu hóa có thời gian nghỉ ngơi trước giấc ngủ.']
  },

  // ================= THỨ 6 =================
  {
    id: 't6_sang',
    day: 'thu6',
    mealType: 'sang',
    mealTitle: 'Bữa sáng',
    name: '2 trứng nguyên quả + 1 củ khoai lang vừa',
    shortDesc: '2 trứng luộc + 1 củ khoai lang vừa',
    tagline: 'Cặp đôi năng lượng hoàn hảo cho ngày làm việc cuối tuần',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80',
    prepTime: '15 phút',
    difficulty: 'Rất dễ',
    calories: 310,
    ingredients: [
      { id: 'trung_ga', name: 'Trứng gà', amount: 2, unit: 'quả', displayAmount: '2 quả' },
      { id: 'khoai_lang', name: 'Khoai lang luộc', amount: 1, unit: 'củ', displayAmount: '1 củ vừa' }
    ],
    steps: [
      { title: 'Chuẩn bị', desc: 'Luộc 2 quả trứng và 1 củ khoai lang chín tới, ăn ấm nóng.' }
    ],
    tips: ['Khoai lang vỏ tím ruột vàng ngọt thơm tự nhiên.']
  },
  {
    id: 't6_trua',
    day: 'thu6',
    mealType: 'trua',
    mealTitle: 'Bữa trưa',
    name: '150g cơm chín + 120g ức gà luộc + bắp cải luộc',
    shortDesc: '150g cơm + 120g ức gà luộc + bắp cải luộc',
    tagline: 'Sạch sẽ • Tươi ngon • Đạt chuẩn Eat Clean khắt khe',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80',
    prepTime: '18 phút',
    difficulty: 'Dễ',
    calories: 445,
    ingredients: [
      { id: 'gao_trang', name: 'Cơm chín', amount: 0.065, unit: 'kg', displayAmount: '150g' },
      { id: 'uc_ga', name: 'Ức gà phi lê', amount: 0.12, unit: 'kg', displayAmount: '120g' },
      { id: 'bap_cai', name: 'Bắp cải ngọt luộc', amount: 1, unit: 'phần', displayAmount: '1 đĩa' },
      { id: 'muoi_gia_vi', name: 'Muối, gừng', amount: 1, unit: 'ít', displayAmount: '1 ít' }
    ],
    steps: [
      { title: 'Luộc ức gà & bắp cải', desc: 'Nấu nước sôi có vài lát gừng, luộc ức gà 8 phút rồi vớt ra, cho bắp cải vào luộc giòn ngọt.' }
    ],
    tips: ['Ăn chậm nhai kỹ để não bộ cảm nhận tín hiệu no kịp thời.']
  },
  {
    id: 't6_phu',
    day: 'thu6',
    mealType: 'phu',
    mealTitle: 'Bữa phụ',
    name: '1 hũ sữa chua + 1 quả chuối',
    shortDesc: '1 hũ sữa chua + 1 quả chuối',
    tagline: 'Món ăn vặt healthy quốc dân',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
    prepTime: '2 phút',
    difficulty: 'Rất dễ',
    calories: 175,
    ingredients: [
      { id: 'sua_chua', name: 'Sữa chua không đường', amount: 1, unit: 'hũ', displayAmount: '1 hũ' },
      { id: 'chuoi', name: 'Chuối chín', amount: 1, unit: 'quả', displayAmount: '1 quả' }
    ],
    steps: [
      { title: 'Thưởng thức', desc: 'Ăn trực tiếp hoặc dầm chuối cùng sữa chua.' }
    ],
    tips: ['Cung cấp năng lượng tức thì trước buổi tập thể dục buổi chiều.']
  },
  {
    id: 't6_toi',
    day: 'thu6',
    mealType: 'toi',
    mealTitle: 'Bữa tối',
    name: '150g cơm chín + 2 trứng nguyên quả + rau muống luộc',
    shortDesc: '150g cơm + 2 trứng luộc + rau muống luộc vắt chanh',
    tagline: 'Cơm tối truyền thống đậm đà phong vị gia đình',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    prepTime: '15 phút',
    difficulty: 'Rất dễ',
    calories: 405,
    ingredients: [
      { id: 'gao_trang', name: 'Cơm chín', amount: 0.065, unit: 'kg', displayAmount: '150g' },
      { id: 'trung_ga', name: 'Trứng gà luộc', amount: 2, unit: 'quả', displayAmount: '2 quả' },
      { id: 'rau_muong', name: 'Rau muống non luộc', amount: 1, unit: 'phần', displayAmount: '1 mớ nhỏ' },
      { id: 'muoi_gia_vi', name: 'Chanh, muối, nước mắm', amount: 1, unit: 'ít', displayAmount: 'Nước luộc rau vắt chanh' }
    ],
    steps: [
      { title: 'Luộc rau muống', desc: 'Đun nước sôi già với chút muối, thả rau muống vào ngập nước đảo nhanh trong 2-3 phút rồi vớt ra đĩa.' },
      { title: 'Nước canh chanh', desc: 'Để nước luộc rau nguội bớt, vắt nửa quả chanh vào bát nước luộc để có bát canh chua thanh mát.' },
      { title: 'Bữa cơm', desc: 'Ăn cùng 2 quả trứng luộc dầm tương hoặc nước mắm chanh ớt.' }
    ],
    tips: ['Không vắt chanh khi nước canh còn sôi già sẽ làm canh bị đắng.']
  },

  // ================= THỨ 7 =================
  {
    id: 't7_sang',
    day: 'thu7',
    mealType: 'sang',
    mealTitle: 'Bữa sáng',
    name: '1 củ khoai lang vừa + 2 trứng luộc',
    shortDesc: '1 củ khoai lang + 2 trứng luộc',
    tagline: 'Thư thả cuối tuần cùng bữa sáng đơn giản, giàu dinh dưỡng',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    prepTime: '15 phút',
    difficulty: 'Rất dễ',
    calories: 310,
    ingredients: [
      { id: 'khoai_lang', name: 'Khoai lang', amount: 1, unit: 'củ', displayAmount: '1 củ vừa' },
      { id: 'trung_ga', name: 'Trứng gà', amount: 2, unit: 'quả', displayAmount: '2 quả' }
    ],
    steps: [
      { title: 'Chuẩn bị', desc: 'Luộc chín khoai và trứng, dùng kèm trà hoa cúc hoặc nước lọc ấm.' }
    ],
    tips: ['Cuối tuần có thể nướng khoai bằng nồi chiên không dầu để khoai tươm mật thơm nức.']
  },
  {
    id: 't7_trua',
    day: 'thu7',
    mealType: 'trua',
    mealTitle: 'Bữa trưa',
    name: '150g cơm chín + 120–150g thịt heo nạc áp chảo ít dầu + rau luộc',
    shortDesc: '150g cơm + thịt nạc áp chảo ít dầu + rau luộc',
    tagline: 'Đổi vị cuối tuần thơm lừng gia vị mà vẫn cực kỳ thon gọn',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    prepTime: '20 phút',
    difficulty: 'Dễ',
    calories: 475,
    ingredients: [
      { id: 'gao_trang', name: 'Cơm chín', amount: 0.065, unit: 'kg', displayAmount: '150g' },
      { id: 'thit_heo_nac', name: 'Thịt heo nạc thăn', amount: 0.15, unit: 'kg', displayAmount: '120-150g' },
      { id: 'rau_xanh_mix', name: 'Rau luộc theo mùa', amount: 1, unit: 'phần', displayAmount: '1 đĩa rau' },
      { id: 'muoi_gia_vi', name: 'Tiêu, tỏi băm, xíu dầu hào', amount: 1, unit: 'ít', displayAmount: 'Gia vị ướp' }
    ],
    steps: [
      { title: 'Ướp thịt nạc', desc: 'Thịt nạc thái lát vừa, ướp với chút tiêu, tỏi băm và vài giọt dầu hào trong 10 phút.' },
      { title: 'Áp chảo', desc: 'Quét 1 lớp dầu ăn siêu mỏng lên chảo chống dính, áp chảo thịt vàng 2 mặt trong 5-7 phút.' },
      { title: 'Thưởng thức', desc: 'Ăn kèm cơm nóng và đĩa rau luộc thanh mát.' }
    ],
    tips: ['Áp chảo lửa vừa giúp thịt giữ được độ mềm mọng tự nhiên mà không cần nhiều mỡ.']
  },
  {
    id: 't7_phu',
    day: 'thu7',
    mealType: 'phu',
    mealTitle: 'Bữa phụ',
    name: '1 ly sữa không đường + 1 phần trái cây',
    shortDesc: '1 ly sữa không đường + 1 phần trái cây',
    tagline: 'Món tráng miệng thanh nhẹ cho buổi chiều thứ 7 thảnh thơi',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    prepTime: '2 phút',
    difficulty: 'Rất dễ',
    calories: 160,
    ingredients: [
      { id: 'sua_tuoi', name: 'Sữa tươi không đường', amount: 1, unit: 'hộp', displayAmount: '1 hộp' },
      { id: 'trai_cay_mix', name: 'Trái cây theo mùa', amount: 1, unit: 'phần', displayAmount: '1 đĩa nhỏ' }
    ],
    steps: [
      { title: 'Chuẩn bị', desc: 'Thưởng thức trái cây tươi mát cùng hộp sữa.' }
    ],
    tips: ['Bổ sung vitamin tự nhiên giúp da dẻ hồng hào sau một tuần học tập và làm việc.']
  },
  {
    id: 't7_toi',
    day: 'thu7',
    mealType: 'toi',
    mealTitle: 'Bữa tối',
    name: '150g cơm chín + 120g cá luộc hoặc hấp + canh bí đỏ',
    shortDesc: '150g cơm + 120g cá hấp gừng + canh bí đỏ',
    tagline: 'Cá giàu Omega-3 • Canh bí đỏ bùi ngọt • Dễ tiêu thư thái',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    prepTime: '22 phút',
    difficulty: 'Dễ',
    calories: 420,
    ingredients: [
      { id: 'gao_trang', name: 'Cơm chín', amount: 0.065, unit: 'kg', displayAmount: '150g' },
      { id: 'ca_loc', name: 'Cá phi lê tươi', amount: 0.12, unit: 'kg', displayAmount: '120g' },
      { id: 'bi_do', name: 'Bí đỏ gọt vỏ thái miếng', amount: 1, unit: 'phần', displayAmount: '1 bát canh' },
      { id: 'muoi_gia_vi', name: 'Gừng, hành lá, tiêu', amount: 1, unit: 'ít', displayAmount: 'Gia vị hấp cá' }
    ],
    steps: [
      { title: 'Hấp cá', desc: 'Cá phi lê rửa sạch với rượu/gừng để khử tanh, xếp gừng sợi và hành hoa lên trên rồi hấp cách thủy 10-12 phút.' },
      { title: 'Nấu canh bí đỏ', desc: 'Đun sôi nước, cho bí đỏ vào nấu nhừ trong 8 phút, nêm chút muối thanh và rắc hành hoa thơm.' },
      { title: 'Bày bữa tối', desc: 'Cá hấp ngọt lịm ăn cùng cơm trắng nóng hổi và canh bí đỏ ngọt bùi.' }
    ],
    tips: ['Cá hấp gừng hành là phương pháp chế biến giữ trọn vẹn dưỡng chất quý giá nhất của cá.']
  },

  // ================= CHỦ NHẬT =================
  {
    id: 'cn_sang',
    day: 'chunhat',
    mealType: 'sang',
    mealTitle: 'Bữa sáng',
    name: '2 trứng luộc + 1 ly sữa không đường + 1 quả chuối',
    shortDesc: '2 trứng luộc + 1 hộp sữa + 1 quả chuối',
    tagline: 'Bữa sáng tràn đầy sinh lực cho ngày Chủ nhật năng động',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80',
    prepTime: '10 phút',
    difficulty: 'Rất dễ',
    calories: 330,
    ingredients: [
      { id: 'trung_ga', name: 'Trứng gà', amount: 2, unit: 'quả', displayAmount: '2 quả' },
      { id: 'sua_tuoi', name: 'Sữa tươi không đường', amount: 1, unit: 'hộp', displayAmount: '1 hộp' },
      { id: 'chuoi', name: 'Chuối chín', amount: 1, unit: 'quả', displayAmount: '1 quả' }
    ],
    steps: [
      { title: 'Bữa sáng nhanh gọn', desc: 'Luộc 2 quả trứng 7 phút, ăn kèm chuối tiêu chín thơm và 1 hộp sữa tươi mát lành.' }
    ],
    tips: ['Cung cấp đủ 3 nhóm chất dinh dưỡng chỉ trong chưa đầy 10 phút chuẩn bị.']
  },
  {
    id: 'cn_trua',
    day: 'chunhat',
    mealType: 'trua',
    mealTitle: 'Bữa trưa',
    name: '150g cơm chín + 120–150g tôm luộc + rau luộc',
    shortDesc: '150g cơm + 120-150g tôm luộc + rau luộc',
    tagline: 'Bữa trưa cao cấp mà vẫn cực kỳ kinh tế • Thanh sạch nhẹ dạ',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    prepTime: '15 phút',
    difficulty: 'Dễ',
    calories: 390,
    ingredients: [
      { id: 'gao_trang', name: 'Cơm chín', amount: 0.065, unit: 'kg', displayAmount: '150g' },
      { id: 'tom_tuoi', name: 'Tôm tươi luộc gừng', amount: 0.15, unit: 'kg', displayAmount: '120-150g' },
      { id: 'rau_xanh_mix', name: 'Rau xanh luộc', amount: 1, unit: 'phần', displayAmount: '1 đĩa rau giòn' },
      { id: 'muoi_gia_vi', name: 'Gừng, muối', amount: 1, unit: 'ít', displayAmount: 'Gia vị luộc' }
    ],
    steps: [
      { title: 'Chế biến tôm luộc', desc: 'Tôm tươi làm sạch luộc với vài lát gừng và muối trong 3 phút, vớt ra ăn cùng rau luộc.' }
    ],
    tips: ['Tôm luộc chấm muối tiêu chanh hoặc mù tạt đều rất tuyệt.']
  },
  {
    id: 'cn_phu',
    day: 'chunhat',
    mealType: 'phu',
    mealTitle: 'Bữa phụ',
    name: 'Đu đủ hoặc sữa chua + một ít đậu phộng',
    shortDesc: 'Đu đủ chín / Sữa chua + ít hạt đậu phộng',
    tagline: 'Kết hợp enzym đu đủ và chất béo tốt từ hạt lạc rang',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    prepTime: '3 phút',
    difficulty: 'Rất dễ',
    calories: 165,
    ingredients: [
      { id: 'du_du', name: 'Đu đủ chín ngọt mát', amount: 1, unit: 'phần', displayAmount: '1 đĩa nhỏ (~150g)' },
      { id: 'dau_phong', name: 'Đậu phộng rang', amount: 1, unit: 'phần', displayAmount: '1 nhúm (~15g)' }
    ],
    steps: [
      { title: 'Chuẩn bị', desc: 'Đu đủ gọt vỏ bỏ hạt cắt miếng vuông, rắc vài hạt đậu phộng rang giòn lên trên.' }
    ],
    tips: ['Đậu phộng giàu chất béo tốt nhưng nên ăn lượng vừa phải (khoảng 10-15 hạt).']
  },
  {
    id: 'cn_toi',
    day: 'chunhat',
    mealType: 'toi',
    mealTitle: 'Bữa tối',
    name: '150g cơm chín + 150g đậu phụ + rau xanh + 1 trứng',
    shortDesc: '150g cơm + 150g đậu phụ + rau xanh + 1 trứng',
    tagline: 'Bữa tối kết tuần trọn vẹn • Nhẹ bụng chuẩn bị năng lượng cho tuần mới',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    prepTime: '15 phút',
    difficulty: 'Dễ',
    calories: 415,
    ingredients: [
      { id: 'gao_trang', name: 'Cơm chín', amount: 0.065, unit: 'kg', displayAmount: '150g' },
      { id: 'dau_phu', name: 'Đậu phụ trắng luộc/áp chảo', amount: 1, unit: 'bìa', displayAmount: '1 bìa 150g' },
      { id: 'trung_ga', name: 'Trứng gà', amount: 1, unit: 'quả', displayAmount: '1 quả' },
      { id: 'rau_xanh_mix', name: 'Rau xanh luộc/canh', amount: 1, unit: 'phần', displayAmount: '1 đĩa rau' },
      { id: 'muoi_gia_vi', name: 'Gia vị thanh nhẹ', amount: 1, unit: 'ít', displayAmount: 'Gia vị cơ bản' }
    ],
    steps: [
      { title: 'Chế biến', desc: 'Đậu phụ chần nước sôi cho nóng mềm. Trứng luộc lòng đào thơm bùi. Rau xanh luộc chín tới chấm mắm trứng.' }
    ],
    tips: ['Món ăn thanh lọc tiêu hóa, giúp bạn có giấc ngủ sâu và thức dậy sảng khoái vào sáng Thứ 2.']
  }
];

// Day metadata
const DAYS_CONFIG = [
  { id: 'thu2', name: 'Thứ 2', subtitle: 'Khởi đầu nhẹ nhàng', decor: '🌿' },
  { id: 'thu3', name: 'Thứ 3', subtitle: 'Tăng năng lượng', decor: '⚡' },
  { id: 'thu4', name: 'Thứ 4', subtitle: 'Cân bằng dinh dưỡng', decor: '🥗' },
  { id: 'thu5', name: 'Thứ 5', subtitle: 'Giàu protein nạc', decor: '🍤' },
  { id: 'thu6', name: 'Thứ 6', subtitle: 'Giữ dáng săn chắc', decor: '💪' },
  { id: 'thu7', name: 'Thứ 7', subtitle: 'Thanh đạm cuối tuần', decor: '🍃' },
  { id: 'chunhat', name: 'Chủ nhật', subtitle: 'Khỏe đẹp mỗi ngày', decor: '✨' }
];

// -------------------------------------------------------------------
// 3. APPLICATION STATE & PERSISTENCE (LOCALSTORAGE)
// -------------------------------------------------------------------
const STORAGE_KEYS = {
  PROFILE: 'ankhoedangdep_user_profile',
  CUSTOM_PRICES: 'ankhoedangdep_custom_prices',
  MEALS: 'ankhoedangdep_meals',
  FAVORITES: 'ankhoedangdep_favorites',
  BOUGHT_ITEMS: 'ankhoedangdep_bought_items'
};

const DEFAULT_PROFILE = {
  gender: 'Nữ',
  age: 22,
  height: 156, // cm
  weight: 50,  // kg
  activity: 'Ít vận động',
  dailyBudget: 70000 // VNĐ/ngày
};

class AppState {
  constructor() {
    this.profile = this.loadData(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
    this.ingredients = this.loadData(STORAGE_KEYS.CUSTOM_PRICES, DEFAULT_INGREDIENTS);
    this.meals = this.loadData(STORAGE_KEYS.MEALS, DEFAULT_MEALS_DATA);
    this.favorites = new Set(this.loadData(STORAGE_KEYS.FAVORITES, []));
    this.boughtItems = new Set(this.loadData(STORAGE_KEYS.BOUGHT_ITEMS, []));

    // Runtime state
    this.currentView = 'menu7d';
    this.selectedDay = 'thu2';
    this.mealFilter = 'all';
    this.favoriteOnly = false;
    this.searchQuery = '';
    this.selectedDishId = 't3_toi'; // Default matches image: Tôm luộc
    this.detailPortion = 1;
    this.ingredientCategoryFilter = 'all';
  }

  loadData(key, fallback) {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(fallback));
    } catch (e) {
      console.warn(`Lỗi đọc localStorage với key ${key}:`, e);
      return JSON.parse(JSON.stringify(fallback));
    }
  }

  saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(`Lỗi ghi localStorage với key ${key}:`, e);
    }
  }

  saveProfile(profile) {
    this.profile = { ...this.profile, ...profile };
    this.saveData(STORAGE_KEYS.PROFILE, this.profile);
  }

  saveCustomPrices(prices) {
    this.ingredients = { ...prices };
    this.saveData(STORAGE_KEYS.CUSTOM_PRICES, this.ingredients);
  }

  saveFavorites() {
    this.saveData(STORAGE_KEYS.FAVORITES, Array.from(this.favorites));
  }

  saveBoughtItems() {
    this.saveData(STORAGE_KEYS.BOUGHT_ITEMS, Array.from(this.boughtItems));
  }

  toggleFavorite(dishId) {
    if (this.favorites.has(dishId)) {
      this.favorites.delete(dishId);
      this.saveFavorites();
      return false;
    } else {
      this.favorites.add(dishId);
      this.saveFavorites();
      return true;
    }
  }

  toggleBought(ingId) {
    if (this.boughtItems.has(ingId)) {
      this.boughtItems.delete(ingId);
    } else {
      this.boughtItems.add(ingId);
    }
    this.saveBoughtItems();
  }

  resetAll() {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_PRICES);
    localStorage.removeItem(STORAGE_KEYS.MEALS);
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    localStorage.removeItem(STORAGE_KEYS.BOUGHT_ITEMS);

    this.profile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
    this.ingredients = JSON.parse(JSON.stringify(DEFAULT_INGREDIENTS));
    this.meals = JSON.parse(JSON.stringify(DEFAULT_MEALS_DATA));
    this.favorites.clear();
    this.boughtItems.clear();
  }
}

const state = new AppState();

// -------------------------------------------------------------------
// 4. CALCULATION HELPER FUNCTIONS (TIỀN & NGUYÊN LIỆU)
// -------------------------------------------------------------------

/**
 * Format currency VND nicely: e.g. 26.000đ
 */
function formatVND(amount) {
  if (isNaN(amount) || amount === null) return '0đ';
  const rounded = Math.round(amount);
  return rounded.toLocaleString('vi-VN') + 'đ';
}

/**
 * Cấu hình quy cách đóng gói và công thức tính giá tự động cho cột Ghi chú mua sắm
 */
const RETAIL_PACK_CONFIG = {
  tom_tuoi: (p) => `Khay 500g (~${formatVND(p * 0.5)})`,
  uc_ga: (p) => `Khay 500g (~${formatVND(p * 0.5)})`,
  thit_heo_nac: (p) => `Miếng 300g (~${formatVND(p * 0.3)})`,
  ca_loc: (p) => `Khay 300g (~${formatVND(p * 0.3)})`,
  trung_ga: (p) => `Hộp 10 quả (${formatVND(p * 10)})`,
  sua_tuoi: (p) => `Lốc 4 hộp 180ml (${formatVND(p * 4)})`,
  sua_chua: (p) => `Lốc 4 hũ 100g (${formatVND(p * 4)})`,
  dau_phu: (p) => `Miếng 150g (${formatVND(p)})`,
  gao_trang: (p) => `Túi 5kg (~${formatVND(p * 5)})`,
  khoai_lang: (p) => `Túi 1kg (~${formatVND(p * 4)} / 4 củ)`,
  banh_mi: (p) => `1 ổ (${formatVND(p)})`,
  chuoi: (p) => `Nải 1-1.5kg (~${formatVND(Math.round((p * 8.333) / 1000) * 1000)})`,
  tao_do: (p) => `Túi 1kg (~${formatVND(p * 5)} / 5 quả)`,
  du_du: (p) => `1 quả 800g (~${formatVND(Math.round((p * 3.333) / 1000) * 1000)})`,
  trai_cay_mix: (p) => `Khay hoa quả (~${formatVND(p * 2.5)})`,
  bap_cai: (p) => `Bắp 800g (~${formatVND(p * 3)})`,
  su_hao_ca_rot: (p) => `Combo rau củ (~${formatVND(p * 2.4)})`,
  cai_thia: (p) => `Bó 400g (~${formatVND(p * 2.5)})`,
  rau_muong: (p) => `Mớ rau muống (~${formatVND(p * 2)})`,
  bi_dao: (p) => `1 quả bí đao (~${formatVND(p * 3)})`,
  bi_do: (p) => `Khúc bí đỏ 400g (~${formatVND(p * 2)})`,
  rau_xanh_mix: (p) => `Bó rau xanh (~${formatVND(p * 2)})`,
  ca_chua: (p) => `Túi 500g (~${formatVND(p * 5)})`,
  rau_dua: (p) => `Bó rau thơm dưa leo (~${formatVND(p * 3)})`,
  dau_phong: (p) => `Gói 100g (~${formatVND(p * 4)})`,
  muoi_gia_vi: (p) => p === 500 ? 'Gói gia vị dùng nhiều lần' : `Gói gia vị (~${formatVND(p * 20)})`
};

/**
 * Tự động tính toán ghi chú mua sắm ứng với giá người dùng sửa
 */
function getDynamicRetailPack(ingId, unitPrice, fallbackText = '') {
  const p = Number(unitPrice) || 0;
  const fn = RETAIL_PACK_CONFIG[ingId];
  if (typeof fn === 'function') {
    return fn(p);
  }
  return fallbackText || 'Quy cách chuẩn';
}

/**
 * Tính chi phí của 1 nguyên liệu cụ thể trong món
 */
function calculateIngredientCost(ingItem, portionMultiplier = 1) {
  const masterIng = state.ingredients[ingItem.id];
  if (!masterIng) return 0;

  const unitPrice = Number(masterIng.unitPrice) || 0;
  const baseAmount = Number(ingItem.amount) || 1;
  const totalAmount = baseAmount * portionMultiplier;

  return totalAmount * unitPrice;
}

/**
 * Tính chi phí 1 món ăn dựa trên bảng giá nguyên liệu hiện tại
 */
function calculateDishCost(dish, portionMultiplier = 1) {
  if (!dish || !dish.ingredients) return 0;
  let total = 0;
  for (const ing of dish.ingredients) {
    total += calculateIngredientCost(ing, portionMultiplier);
  }
  return total;
}

/**
 * Tính tổng chi phí cho 1 ngày cụ thể
 */
function calculateDayCost(dayId) {
  const dayMeals = state.meals.filter(m => m.day === dayId);
  return dayMeals.reduce((sum, m) => sum + calculateDishCost(m), 0);
}

/**
 * Tính tổng chi phí cho cả tuần 7 ngày
 */
function calculateWeekTotalCost() {
  return state.meals.reduce((sum, m) => sum + calculateDishCost(m), 0);
}

/**
 * Tổng hợp toàn bộ nguyên liệu của tuần 7 ngày (gộp trùng và tính lượng)
 */
function aggregateWeeklyIngredients() {
  const aggregated = {};

  for (const dish of state.meals) {
    for (const ing of dish.ingredients) {
      const id = ing.id;
      const master = state.ingredients[id] || {
        id,
        name: ing.name,
        category: 'seasoning',
        unit: ing.unit,
        unitPrice: 1000,
        retailPack: 'Theo nhu cầu',
        note: ''
      };

      if (!aggregated[id]) {
        aggregated[id] = {
          id: id,
          name: master.name,
          category: master.category,
          unit: master.unit,
          unitPrice: master.unitPrice,
          retailPack: getDynamicRetailPack(master.id, master.unitPrice, master.retailPack),
          note: master.note,
          totalAmount: 0,
          usedCount: 0
        };
      }

      aggregated[id].totalAmount += Number(ing.amount) || 0;
      aggregated[id].usedCount += 1;
    }
  }

  return Object.values(aggregated);
}

// -------------------------------------------------------------------
// 5. UI RENDERERS
// -------------------------------------------------------------------

/**
 * Cập nhật thông tin hồ sơ người dùng trên toàn website
 */
function renderUserProfile() {
  const { gender, age, height, weight, activity, dailyBudget } = state.profile;

  // Sidebar card
  const valGenderAge = document.getElementById('val-gender-age');
  const valBody = document.getElementById('val-body');
  const valActivity = document.getElementById('val-activity');
  const valBudget = document.getElementById('val-budget');

  if (valGenderAge) valGenderAge.textContent = `${gender} • ${age} tuổi`;
  if (valBody) valBody.textContent = `Cao ${height >= 100 ? (height / 100).toFixed(2).replace('.', 'm') : height + 'cm'} • Nặng ${weight}kg`;
  if (valActivity) valActivity.textContent = activity;
  if (valBudget) valBudget.textContent = `Ngân sách: ${formatVND(dailyBudget)}/ngày`;

  // Hero Banner Badges
  const badgeGenderAge = document.getElementById('badge-gender-age');
  const badgeHeight = document.getElementById('badge-height');
  const badgeWeight = document.getElementById('badge-weight');
  const badgeActivity = document.getElementById('badge-activity');
  const badgeBudget = document.getElementById('badge-budget');

  if (badgeGenderAge) badgeGenderAge.textContent = `👤 ${gender} ${age} tuổi`;
  if (badgeHeight) badgeHeight.textContent = `📏 Cao ${height >= 100 ? (height / 100).toFixed(2).replace('.', 'm') : height + 'cm'}`;
  if (badgeWeight) badgeWeight.textContent = `⚖️ Nặng ${weight}kg`;
  if (badgeActivity) badgeActivity.textContent = `🏃 ${activity}`;
  if (badgeBudget) badgeBudget.textContent = `💰 Ngân sách ${formatVND(dailyBudget)}/ngày`;

  // Settings form values
  const inputGender = document.getElementById('setting-gender');
  const inputAge = document.getElementById('setting-age');
  const inputHeight = document.getElementById('setting-height');
  const inputWeight = document.getElementById('setting-weight');
  const inputActivity = document.getElementById('setting-activity');
  const inputBudget = document.getElementById('setting-budget');

  if (inputGender) inputGender.value = gender;
  if (inputAge) inputAge.value = age;
  if (inputHeight) inputHeight.value = height;
  if (inputWeight) inputWeight.value = weight;
  if (inputActivity) inputActivity.value = activity;
  if (inputBudget) inputBudget.value = dailyBudget;

  // Recalculate BMI & TDEE in Nutrition section
  renderNutritionStats();
}

/**
 * Hiển thị lưới Thực đơn 7 ngày (Weekly Grid layout như hình mẫu)
 */
function renderMealPlan() {
  const container = document.getElementById('meal-plan-container');
  if (!container) return;

  container.innerHTML = '';

  // Lọc theo ngày nếu người dùng chọn cụ thể
  let daysToRender = DAYS_CONFIG;
  if (state.selectedDay !== 'all') {
    // Nếu chọn 1 ngày, ưu tiên hiển thị ngày đó ở đầu hoặc chỉ hiển thị ngày đó
    // Để giữ phong cách dashboard tổng quan tuần như ảnh, hiển thị tất cả các ngày nhưng highlight ngày được chọn!
  }

  const query = state.searchQuery.toLowerCase().trim();

  let hasAnyMatch = false;

  DAYS_CONFIG.forEach(dayCfg => {
    const dayMeals = state.meals.filter(m => m.day === dayCfg.id);
    const dayCost = calculateDayCost(dayCfg.id);

    // Kiểm tra bộ lọc tìm kiếm hoặc bữa ăn
    const filteredMeals = dayMeals.filter(meal => {
      // Bộ lọc loại bữa
      if (state.mealFilter !== 'all' && meal.mealType !== state.mealFilter) {
        return false;
      }
      // Bộ lọc yêu thích
      if (state.favoriteOnly && !state.favorites.has(meal.id)) {
        return false;
      }
      // Bộ lọc từ khóa tìm kiếm
      if (query) {
        const matchName = meal.name.toLowerCase().includes(query);
        const matchIng = meal.ingredients.some(i => i.name.toLowerCase().includes(query));
        const matchDesc = meal.tagline.toLowerCase().includes(query);
        if (!matchName && !matchIng && !matchDesc) return false;
      }
      return true;
    });

    // Nếu có bộ lọc và ngày này không có món nào khớp thì ẩn ngày đó
    if ((query || state.mealFilter !== 'all' || state.favoriteOnly) && filteredMeals.length === 0) {
      return;
    }

    hasAnyMatch = true;

    // Card dòng của ngày
    const dayRowCard = document.createElement('div');
    dayRowCard.className = `day-row-card ${state.selectedDay === dayCfg.id ? 'highlighted-day' : ''}`;
    dayRowCard.id = `day-row-${dayCfg.id}`;

    // Cột 1: Thông tin Ngày
    const badgeCol = document.createElement('div');
    badgeCol.className = 'day-row-badge-col';
    badgeCol.innerHTML = `
      <div class="day-row-name">
        <span>${dayCfg.name}</span>
      </div>
      <div class="day-row-subtitle">${dayCfg.subtitle}</div>
      <div class="day-row-cost-tag">
        <span>💰</span> ${formatVND(dayCost)}
      </div>
    `;
    dayRowCard.appendChild(badgeCol);

    // 4 Cột tiếp theo: Bữa sáng, Bữa trưa, Bữa phụ, Bữa tối
    const mealTypesOrder = ['sang', 'trua', 'phu', 'toi'];
    const mealTypeLabels = {
      sang: 'Bữa sáng',
      trua: 'Bữa trưa',
      phu: 'Bữa phụ',
      toi: 'Bữa tối'
    };

    mealTypesOrder.forEach(type => {
      const meal = dayMeals.find(m => m.mealType === type);

      const slotCard = document.createElement('div');
      slotCard.className = 'meal-slot-card';

      if (!meal) {
        slotCard.innerHTML = `
          <div class="meal-slot-header">
            <span class="meal-slot-category">${mealTypeLabels[type]}</span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); padding: 12px 0;">Chưa có món</div>
        `;
        dayRowCard.appendChild(slotCard);
        return;
      }

      const isFav = state.favorites.has(meal.id);
      const isSelected = state.selectedDishId === meal.id;
      if (isSelected) slotCard.classList.add('active-selected');

      const dishCost = calculateDishCost(meal);

      slotCard.innerHTML = `
        <div class="meal-slot-header">
          <span class="meal-slot-category">${meal.mealTitle}</span>
          <button class="meal-slot-fav-btn ${isFav ? 'is-fav' : ''}" data-id="${meal.id}" title="Yêu thích">
            ${isFav ? '♥' : '♡'}
          </button>
        </div>
        <div class="meal-slot-body">
          <img src="${meal.image}" alt="${meal.name}" class="meal-slot-thumb"
            onerror="this.onerror=null; this.src='favicon.jpg';" />
          <div class="meal-slot-content">
            <span class="meal-slot-cat-badge-mobile">${meal.mealTitle}</span>
            <div class="meal-slot-title" title="${meal.name}">${meal.name}</div>
          </div>
        </div>
        <div class="meal-slot-footer">
          <span class="meal-slot-price">~ ${formatVND(dishCost)}</span>
          <span class="meal-slot-arrow">→</span>
        </div>
      `;

      // Click card xem chi tiết món ăn ở Panel phải
      slotCard.addEventListener('click', (e) => {
        // Tránh trigger nếu bấm nút favorite
        if (e.target.closest('.meal-slot-fav-btn')) return;
        selectDish(meal.id);
      });

      // Bấm nút tim
      const favBtn = slotCard.querySelector('.meal-slot-fav-btn');
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const liked = state.toggleFavorite(meal.id);
        renderMealPlan();
        updateFavoritesBadge();
        if (state.selectedDishId === meal.id) renderDishDetail(meal);
        showToast(liked ? `Đã thêm "${meal.name.slice(0, 24)}..." vào yêu thích!` : 'Đã bỏ yêu thích món ăn.', 'success');
      });

      dayRowCard.appendChild(slotCard);
    });

    container.appendChild(dayRowCard);
  });

  if (!hasAnyMatch) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px 20px; background: white; border-radius: var(--radius-lg); border: 1px dashed var(--border-color);">
        <div style="font-size: 2.5rem; margin-bottom: 10px;">🔍</div>
        <h3 style="font-size: 1.15rem; color: var(--text-primary); font-weight: 700;">Không tìm thấy món ăn phù hợp</h3>
        <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 4px;">Hãy thử tìm từ khóa khác hoặc xóa bộ lọc để hiển thị đầy đủ thực đơn.</p>
        <button id="btn-reset-filters" class="btn-secondary" style="margin-top: 14px;">
          Xóa tất cả bộ lọc
        </button>
      </div>
    `;
    const resetBtn = document.getElementById('btn-reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.searchQuery = '';
        state.mealFilter = 'all';
        state.favoriteOnly = false;
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) searchInput.value = '';
        updateFilterButtons();
        renderMealPlan();
      });
    }
  }

  updateFavoritesBadge();
}

/**
 * Cập nhật số lượng món yêu thích trên nút bộ lọc
 */
function updateFavoritesBadge() {
  const badge = document.getElementById('fav-count-badge');
  if (badge) {
    badge.textContent = `(${state.favorites.size})`;
  }
}

/**
 * Chọn và hiển thị chi tiết một món ăn ở panel bên phải
 */
function selectDish(dishId) {
  state.selectedDishId = dishId;
  const dish = state.meals.find(m => m.id === dishId);
  if (!dish) return;

  renderDishDetail(dish);

  // Highlight ô món ăn đang chọn
  document.querySelectorAll('.meal-slot-card').forEach(el => el.classList.remove('active-selected'));
  const activeSlots = document.querySelectorAll(`.meal-slot-fav-btn[data-id="${dishId}"]`);
  activeSlots.forEach(btn => {
    const parent = btn.closest('.meal-slot-card');
    if (parent) parent.classList.add('active-selected');
  });

  // Mở slide-over panel trên mobile nếu đang ở màn hình nhỏ
  const rightPanel = document.getElementById('right-detail-panel');
  const backdrop = document.getElementById('detail-backdrop');
  if (window.innerWidth <= 860 && rightPanel) {
    rightPanel.classList.add('panel-open');
    if (backdrop) backdrop.classList.add('active');
    document.body.classList.add('no-scroll-mobile');
  }
}

/**
 * Đóng panel chi tiết món ăn trên mobile
 */
function closeDetailPanel() {
  const rightPanel = document.getElementById('right-detail-panel');
  const backdrop = document.getElementById('detail-backdrop');
  if (rightPanel) rightPanel.classList.remove('panel-open');
  if (backdrop) backdrop.classList.remove('active');
  document.body.classList.remove('no-scroll-mobile');
}

/**
 * Hiển thị nội dung chi tiết món ăn ở Panel phải (khẩu phần, nguyên liệu, cách nấu, mẹo)
 */
function renderDishDetail(dish) {
  if (!dish) return;

  const portion = state.detailPortion;

  // Cập nhật thông tin cơ bản
  const imgEl = document.getElementById('detail-dish-img');
  const catBadge = document.getElementById('detail-category-badge');
  const calBadge = document.getElementById('detail-calories-badge');
  const titleEl = document.getElementById('detail-dish-title');
  const taglineEl = document.getElementById('detail-dish-tagline');
  const prepTimeEl = document.getElementById('detail-prep-time');
  const diffEl = document.getElementById('detail-difficulty');
  const servingTextEl = document.getElementById('detail-serving-text');
  const portionCountEl = document.getElementById('detail-portion-count');
  const favBtn = document.getElementById('btn-dish-fav');
  const ingredientsHeading = document.getElementById('detail-ingredients-heading');

  if (imgEl) {
    imgEl.src = dish.image;
    imgEl.alt = dish.name;
    imgEl.onerror = () => {
      imgEl.onerror = null;
      imgEl.src = 'favicon.jpg';
    };
  }

  if (catBadge) catBadge.textContent = dish.mealTitle || 'Bữa ăn dinh dưỡng';
  if (calBadge) calBadge.textContent = `~ ${Math.round(dish.calories * portion)} kcal`;
  if (titleEl) titleEl.textContent = dish.name;
  if (taglineEl) taglineEl.textContent = dish.tagline;
  if (prepTimeEl) prepTimeEl.textContent = dish.prepTime;
  if (diffEl) diffEl.textContent = dish.difficulty;
  if (servingTextEl) servingTextEl.textContent = `${portion} người`;
  if (portionCountEl) portionCountEl.textContent = portion;

  if (ingredientsHeading) {
    ingredientsHeading.textContent = `Nguyên liệu (cho ${portion} phần)`;
  }

  // Favorite button
  const isFav = state.favorites.has(dish.id);
  if (favBtn) {
    if (isFav) {
      favBtn.classList.add('is-fav');
      favBtn.innerHTML = '♥';
    } else {
      favBtn.classList.remove('is-fav');
      favBtn.innerHTML = '♡';
    }
  }

  // Bảng nguyên liệu chi tiết & giá
  const tbody = document.getElementById('detail-ingredients-tbody');
  const totalCostEl = document.getElementById('detail-total-cost');

  if (tbody) {
    tbody.innerHTML = '';
    let totalCost = 0;

    dish.ingredients.forEach(ing => {
      const master = state.ingredients[ing.id] || {
        name: ing.name,
        unit: ing.unit,
        unitPrice: 1000
      };

      const cost = calculateIngredientCost(ing, portion);
      totalCost += cost;

      const baseAmount = Number(ing.amount) || 1;
      const scaledAmount = baseAmount * portion;

      // Hiển thị khối lượng đẹp
      let displayWeight = ing.displayAmount;
      if (portion !== 1) {
        if (ing.unit === 'kg') {
          displayWeight = `${Math.round(scaledAmount * 1000)}g`;
        } else if (ing.unit === 'quả' || ing.unit === 'hộp' || ing.unit === 'hũ' || ing.unit === 'củ') {
          displayWeight = `${scaledAmount} ${ing.unit}`;
        } else {
          displayWeight = `${portion} phần`;
        }
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="ing-name-cell">
            <span class="ing-thumb-circle">🍃</span>
            <span>${master.name || ing.name}</span>
          </div>
        </td>
        <td class="ing-amount-cell">${displayWeight}</td>
        <td class="ing-price-cell">~ ${formatVND(cost)}</td>
      `;
      tbody.appendChild(tr);
    });

    if (totalCostEl) {
      totalCostEl.textContent = `~ ${formatVND(totalCost)}`;
    }
  }

  // Hướng dẫn chế biến từng bước
  const stepsList = document.getElementById('detail-steps-list');
  if (stepsList) {
    stepsList.innerHTML = '';
    dish.steps.forEach((step, idx) => {
      const item = document.createElement('div');
      item.className = 'step-item';
      item.innerHTML = `
        <div class="step-num-circle">${idx + 1}</div>
        <div class="step-content">
          <div class="step-title">${step.title}</div>
          <div class="step-desc">${step.desc}</div>
        </div>
      `;
      stepsList.appendChild(item);
    });
  }

  // Mẹo nhỏ
  const tipsList = document.getElementById('detail-tips-list');
  if (tipsList) {
    tipsList.innerHTML = '';
    dish.tips.forEach(tip => {
      const li = document.createElement('li');
      li.className = 'tips-item';
      li.textContent = tip;
      tipsList.appendChild(li);
    });
  }
}

/**
 * Hiển thị View 2: Danh sách nguyên liệu (Shopping Checklist)
 */
function renderShoppingList() {
  const aggregated = aggregateWeeklyIngredients();

  const totalKinds = aggregated.length;
  let boughtCount = 0;
  let totalUsageCost = 0;
  let totalRetailCost = 0;

  aggregated.forEach(item => {
    if (state.boughtItems.has(item.id)) boughtCount++;
    const usageCost = item.totalAmount * item.unitPrice;
    totalUsageCost += usageCost;
    // Ước tính mua nguyên gói
    totalRetailCost += usageCost * 1.15; // Giả định thực tế có dư chút ít
  });

  // Cập nhật số liệu thống kê
  const statTotal = document.getElementById('stat-total-ingredients');
  const statBought = document.getElementById('stat-bought-ingredients');
  const statPercent = document.getElementById('stat-bought-percent');
  const statWeeklyCost = document.getElementById('stat-total-weekly-cost');
  const statRetail = document.getElementById('stat-retail-cost');

  if (statTotal) statTotal.textContent = `${totalKinds} loại`;
  if (statBought) statBought.textContent = `${boughtCount}/${totalKinds}`;

  const pct = totalKinds > 0 ? Math.round((boughtCount / totalKinds) * 100) : 0;
  if (statPercent) statPercent.textContent = `Tiến độ ${pct}%`;
  if (statWeeklyCost) statWeeklyCost.textContent = formatVND(totalUsageCost);
  if (statRetail) statRetail.textContent = `~ ${formatVND(totalRetailCost)}`;

  // Bảng nguyên liệu
  const tbody = document.getElementById('shopping-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  const catFilter = state.ingredientCategoryFilter;
  const filtered = aggregated.filter(item => {
    if (catFilter === 'all') return true;
    return item.category === catFilter;
  });

  const catNames = {
    meat: 'Thịt, cá, tôm',
    dairy: 'Trứng & Sữa',
    carb: 'Tinh bột',
    veggie: 'Rau củ & Quả',
    seasoning: 'Gia vị'
  };

  filtered.forEach(item => {
    const isBought = state.boughtItems.has(item.id);
    const itemCost = item.totalAmount * item.unitPrice;

    // Định dạng khối lượng
    let usageStr = '';
    if (item.unit === 'kg') {
      usageStr = `${Math.round(item.totalAmount * 1000)}g`;
    } else if (item.unit === 'quả' || item.unit === 'hộp' || item.unit === 'hũ' || item.unit === 'củ') {
      usageStr = `${Math.round(item.totalAmount)} ${item.unit}`;
    } else {
      usageStr = `${item.usedCount} lần dùng`;
    }

    const tr = document.createElement('tr');
    tr.className = isBought ? 'item-bought' : '';
    tr.innerHTML = `
      <td style="text-align: center;">
        <input type="checkbox" class="shopping-checkbox" data-id="${item.id}" ${isBought ? 'checked' : ''} />
      </td>
      <td>
        <strong class="ing-title">${item.name}</strong>
        ${item.note ? `<div style="font-size: 0.76rem; color: var(--text-muted);">${item.note}</div>` : ''}
      </td>
      <td>
        <span class="category-tag">${catNames[item.category] || 'Thực phẩm'}</span>
      </td>
      <td><strong>${usageStr}</strong></td>
      <td style="color: #6C552E;">${item.retailPack}</td>
      <td>${formatVND(item.unitPrice)} / ${item.unit}</td>
      <td style="text-align: right; font-weight: 700; color: var(--primary-green);">${formatVND(itemCost)}</td>
    `;

    // Checkbox toggle
    const checkbox = tr.querySelector('.shopping-checkbox');
    checkbox.addEventListener('change', () => {
      state.toggleBought(item.id);
      renderShoppingList();
    });

    tbody.appendChild(tr);
  });
}

/**
 * Hiển thị View 3: Ước tính chi phí & Bảng giá tổng
 */
function renderCostEstimates() {
  const weeklyTotal = calculateWeekTotalCost();
  const dailyBudget = state.profile.dailyBudget;
  const targetWeeklyBudget = dailyBudget * 7;
  const dailyAverage = weeklyTotal / 7;
  const budgetDiff = targetWeeklyBudget - weeklyTotal;

  // Cập nhật card tổng quan
  const figTotal = document.getElementById('fig-total-cost');
  const figTarget = document.getElementById('fig-target-budget');
  const figDailyAvg = document.getElementById('fig-daily-avg');
  const figBudgetDiff = document.getElementById('fig-budget-diff');
  const figDailyDiff = document.getElementById('fig-daily-diff');
  const statusPill = document.getElementById('budget-status-pill');
  const progressSpent = document.getElementById('progress-spent-text');
  const progressPercent = document.getElementById('progress-percent-text');
  const progressBar = document.getElementById('cost-progress-fill');

  if (figTotal) figTotal.textContent = formatVND(weeklyTotal);
  if (figTarget) figTarget.textContent = formatVND(targetWeeklyBudget);
  if (figDailyAvg) figDailyAvg.textContent = `${formatVND(dailyAverage)}/ngày`;

  const percentUsed = targetWeeklyBudget > 0 ? Math.round((weeklyTotal / targetWeeklyBudget) * 100) : 0;

  if (progressSpent) progressSpent.textContent = `${formatVND(weeklyTotal)} / ${formatVND(targetWeeklyBudget)}`;
  if (progressPercent) progressPercent.textContent = `${percentUsed}% ngân sách`;

  if (progressBar) {
    const widthClamped = Math.min(percentUsed, 100);
    progressBar.style.width = `${widthClamped}%`;
    progressBar.className = 'progress-fill';

    if (percentUsed <= 100) {
      // Trong ngân sách: Xanh lá
      progressBar.classList.remove('fill-warning', 'fill-over');
      if (statusPill) {
        statusPill.className = 'budget-status-pill status-ok';
        statusPill.innerHTML = `<span>🌿</span> Tiết kiệm ${formatVND(budgetDiff)} (Trong ngân sách)`;
      }
      if (figBudgetDiff) {
        figBudgetDiff.style.color = 'var(--primary-green)';
        figBudgetDiff.textContent = `Dư ${formatVND(budgetDiff)} so với ngân sách`;
      }
    } else if (percentUsed <= 110) {
      // Gần giới hạn: Cam nhạt
      progressBar.classList.add('fill-warning');
      if (statusPill) {
        statusPill.className = 'budget-status-pill status-warning';
        statusPill.innerHTML = `<span>⚠️</span> Vượt nhẹ ${formatVND(Math.abs(budgetDiff))}`;
      }
      if (figBudgetDiff) {
        figBudgetDiff.style.color = 'var(--status-orange)';
        figBudgetDiff.textContent = `Vượt ${formatVND(Math.abs(budgetDiff))} so với ngân sách`;
      }
    } else {
      // Vượt ngân sách: Đỏ nhẹ
      progressBar.classList.add('fill-over');
      if (statusPill) {
        statusPill.className = 'budget-status-pill status-over';
        statusPill.innerHTML = `<span>🚨</span> Vượt ${formatVND(Math.abs(budgetDiff))}`;
      }
      if (figBudgetDiff) {
        figBudgetDiff.style.color = 'var(--status-red)';
        figBudgetDiff.textContent = `Vượt ${formatVND(Math.abs(budgetDiff))} so với ngân sách`;
      }
    }
  }

  if (figDailyDiff) {
    const dayDiff = dailyBudget - dailyAverage;
    figDailyDiff.textContent = dayDiff >= 0
      ? `Tiết kiệm ~${formatVND(dayDiff)}/ngày`
      : `Vượt ~${formatVND(Math.abs(dayDiff))}/ngày`;
    figDailyDiff.style.color = dayDiff >= 0 ? 'var(--primary-green)' : 'var(--status-red)';
  }

  // Bảng chi tiết từng ngày
  const dailyTbody = document.getElementById('daily-cost-table-body');
  if (dailyTbody) {
    dailyTbody.innerHTML = '';

    DAYS_CONFIG.forEach(d => {
      const meals = state.meals.filter(m => m.day === d.id);
      const sang = meals.find(m => m.mealType === 'sang');
      const trua = meals.find(m => m.mealType === 'trua');
      const phu = meals.find(m => m.mealType === 'phu');
      const toi = meals.find(m => m.mealType === 'toi');

      const costSang = calculateDishCost(sang);
      const costTrua = calculateDishCost(trua);
      const costPhu = calculateDishCost(phu);
      const costToi = calculateDishCost(toi);
      const dayTotal = costSang + costTrua + costPhu + costToi;
      const variance = dailyBudget - dayTotal;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${d.name}</strong> <span style="font-size: 0.78rem; color: var(--text-muted); display: block;">${d.subtitle}</span></td>
        <td>${formatVND(costSang)}</td>
        <td>${formatVND(costTrua)}</td>
        <td>${formatVND(costPhu)}</td>
        <td>${formatVND(costToi)}</td>
        <td><strong style="color: var(--primary-green); font-size: 0.95rem;">${formatVND(dayTotal)}</strong></td>
        <td style="color: ${variance >= 0 ? 'var(--primary-green)' : 'var(--status-red)'}; font-weight: 600;">
          ${variance >= 0 ? '+' : ''}${formatVND(variance)}
        </td>
        <td style="text-align: center;">
          <span class="budget-status-pill ${variance >= 0 ? 'status-ok' : 'status-warning'}" style="padding: 3px 8px; font-size: 0.78rem;">
            ${variance >= 0 ? '✓ Tốt' : 'Chú ý'}
          </span>
        </td>
      `;
      dailyTbody.appendChild(tr);
    });
  }

  // Bảng chỉnh sửa đơn giá thị trường
  renderPriceMasterTable();
}

/**
 * Hiển thị bảng chỉnh sửa đơn giá nguyên liệu
 */
function renderPriceMasterTable() {
  const tbody = document.getElementById('price-master-table-body');
  if (!tbody) return;

  tbody.innerHTML = '';

  Object.values(state.ingredients).forEach(ing => {
    const tr = document.createElement('tr');
    const dynamicPack = getDynamicRetailPack(ing.id, ing.unitPrice, ing.retailPack);
    tr.innerHTML = `
      <td><strong>${ing.name}</strong></td>
      <td><span class="category-tag">${ing.unit}</span></td>
      <td>
        <input type="number" class="unit-price-input" data-id="${ing.id}" value="${ing.unitPrice}" step="500" min="0" title="Nhập đơn giá mới tại chợ/siêu thị" />
      </td>
      <td class="retail-pack-cell" data-id="${ing.id}">
        <span class="retail-pack-badge">${dynamicPack}</span>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Gắn sự kiện: khi người dùng điều chỉnh giá, cột ghi chú mua sắm tự điều chỉnh NGAY LẬP TỨC
  tbody.querySelectorAll('.unit-price-input').forEach(input => {
    const updateCellNote = (e) => {
      const ingId = e.target.dataset.id;
      const newPrice = Number(e.target.value) || 0;
      const noteCell = tbody.querySelector(`.retail-pack-cell[data-id="${ingId}"]`);
      if (noteCell) {
        const ing = state.ingredients[ingId];
        const updatedPack = getDynamicRetailPack(ingId, newPrice, ing ? ing.retailPack : '');
        noteCell.innerHTML = `<span class="retail-pack-badge updated">${updatedPack}</span>`;
      }
    };

    input.addEventListener('input', updateCellNote);
    input.addEventListener('change', updateCellNote);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const savePricesBtn = document.getElementById('btn-save-custom-prices');
        if (savePricesBtn) savePricesBtn.click();
      }
    });
  });
}

/**
 * Hiển thị View 4: Kiến thức dinh dưỡng & Công cụ tính BMI / TDEE
 */
function renderNutritionStats() {
  const { height, weight, age, gender, activity } = state.profile;

  // Tính BMI: weight / (height/100)^2
  const hMeters = height / 100;
  const bmi = weight / (hMeters * hMeters);
  const bmiFormatted = bmi.toFixed(1);

  const bmiValEl = document.getElementById('calc-bmi-val');
  const bmiStatusEl = document.getElementById('calc-bmi-status');

  if (bmiValEl) bmiValEl.textContent = bmiFormatted;

  let bmiText = '';
  if (bmi < 18.5) {
    bmiText = 'Thiếu cân nhẹ • Cần nạp đủ năng lượng';
  } else if (bmi <= 22.9) {
    bmiText = 'Vóc dáng Chuẩn • Cân đối & Khỏe mạnh';
  } else if (bmi <= 24.9) {
    bmiText = 'Tiền thừa cân • Thích hợp thực đơn 7 ngày';
  } else {
    bmiText = 'Thừa cân • Cần kiên trì theo thực đơn dinh dưỡng';
  }

  if (bmiStatusEl) bmiStatusEl.textContent = bmiText;

  // Tính BMR (Mifflin-St Jeor formula)
  let bmr = 0;
  if (gender === 'Nữ') {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  }

  // Activity multiplier
  let actMultiplier = 1.2;
  if (activity === 'Vận động nhẹ') actMultiplier = 1.375;
  else if (activity === 'Vận động vừa') actMultiplier = 1.55;
  else if (activity === 'Vận động nhiều') actMultiplier = 1.725;

  const tdee = Math.round(bmr * actMultiplier);
  const tdeeEl = document.getElementById('calc-tdee-val');
  if (tdeeEl) tdeeEl.textContent = `~ ${tdee.toLocaleString('vi-VN')} kcal`;

  // Tính nhu cầu nước: cân nặng * 40ml
  const waterMin = (weight * 0.04).toFixed(1);
  const waterMax = (weight * 0.045).toFixed(1);
  const waterEl = document.getElementById('calc-water-val');
  if (waterEl) waterEl.textContent = `~ ${waterMin} - ${waterMax} Lít`;
}

// -------------------------------------------------------------------
// 6. EVENT LISTENERS & INTERACTION HANDLERS
// -------------------------------------------------------------------

function switchView(viewName) {
  state.currentView = viewName;
  closeDetailPanel();

  // Toggle active views
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const targetView = document.getElementById(`view-${viewName}`);
  if (targetView) targetView.classList.add('active');

  // Toggle active sidebar links
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.view === viewName);
  });

  // Toggle mobile bottom nav links
  document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });

  // Render view-specific data
  if (viewName === 'menu7d') {
    renderMealPlan();
  } else if (viewName === 'ingredients') {
    renderShoppingList();
  } else if (viewName === 'costs') {
    renderCostEstimates();
  } else if (viewName === 'nutrition') {
    renderNutritionStats();
  } else if (viewName === 'settings') {
    renderUserProfile();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateFilterButtons() {
  // Day tabs
  document.querySelectorAll('.day-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.day === state.selectedDay);
  });

  // Meal filter buttons
  document.querySelectorAll('.meal-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === state.mealFilter);
  });

  // Favorite button
  const favFilterBtn = document.getElementById('btn-toggle-favorite-filter');
  if (favFilterBtn) {
    favFilterBtn.classList.toggle('active', state.favoriteOnly);
  }
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '🌱' : '⚠️'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// -------------------------------------------------------------------
// 5B. REAL-TIME ANALOG CLOCK & MEAL TIME PERIOD SYSTEM
// -------------------------------------------------------------------

/**
 * Phân chia khung giờ theo thời gian thực của thiết bị
 * - 5h00 - 11h00: Khung giờ sáng -> Bữa sáng (sang)
 * - 11h01 - 13h30 (1h30 chiều): Khung giờ trưa -> Bữa trưa (trua)
 * - 13h31 - 16h00 (4h chiều): Khung giờ xế -> Bữa phụ (phu)
 * - 16h01 - 22h00 (10h tối): Khung giờ đêm -> Bữa tối (toi)
 */
function getCurrentTimePeriodInfo(now = new Date()) {
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes >= 300 && totalMinutes <= 660) {
    // 5h00 sáng tới 11h00
    return {
      mealType: 'sang',
      periodName: 'Khung giờ sáng',
      mealTitle: 'Bữa sáng',
      timeRange: '5h00 - 11h00',
      icon: '🌅'
    };
  } else if (totalMinutes >= 661 && totalMinutes <= 810) {
    // 11h01 tới 1h30 chiều (13h30)
    return {
      mealType: 'trua',
      periodName: 'Khung giờ trưa',
      mealTitle: 'Bữa trưa',
      timeRange: '11h01 - 13h30',
      icon: '☀️'
    };
  } else if (totalMinutes >= 811 && totalMinutes <= 960) {
    // 1h31 tới 4h chiều (16h00)
    return {
      mealType: 'phu',
      periodName: 'Khung giờ xế',
      mealTitle: 'Bữa phụ',
      timeRange: '13h31 - 16h00',
      icon: '🍵'
    };
  } else if (totalMinutes >= 961 && totalMinutes <= 1320) {
    // 4h01 tới 10h tối (22h00)
    return {
      mealType: 'toi',
      periodName: 'Khung giờ đêm',
      mealTitle: 'Bữa tối',
      timeRange: '16h01 - 22h00',
      icon: '🌙'
    };
  } else {
    // 22h01 đêm tới trước 5h sáng (nghỉ ngơi)
    return {
      mealType: 'sang',
      periodName: 'Giờ nghỉ ngơi',
      mealTitle: 'Bữa sáng',
      timeRange: '22h01 - 4h59',
      icon: '✨',
      isLateNight: true
    };
  }
}

/**
 * Lấy ID ngày trong tuần từ thiết bị
 */
function getCurrentDayId(now = new Date()) {
  const dayOfWeek = now.getDay(); // 0 là Chủ nhật, 1 là Thứ 2, ...
  const dayMap = {
    1: 'thu2',
    2: 'thu3',
    3: 'thu4',
    4: 'thu5',
    5: 'thu6',
    6: 'thu7',
    0: 'chunhat'
  };
  return dayMap[dayOfWeek] || 'thu2';
}

/**
 * Cập nhật kim đồng hồ chạy thời gian thực liên kết với giờ thiết bị
 */
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const secondDeg = seconds * 6;
  const minuteDeg = (minutes + seconds / 60) * 6;
  const hourDeg = ((hours % 12) + minutes / 60 + seconds / 3600) * 30;

  const hourHand = document.getElementById('clock-hand-hour');
  const minuteHand = document.getElementById('clock-hand-minute');
  const secondHand = document.getElementById('clock-hand-second');
  const digitalTimeEl = document.getElementById('clock-digital-time');
  const periodTextEl = document.getElementById('clock-period-text');

  if (hourHand) hourHand.style.transform = `rotate(${hourDeg}deg)`;
  if (minuteHand) minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
  if (secondHand) secondHand.style.transform = `rotate(${secondDeg}deg)`;

  const pad = n => String(n).padStart(2, '0');
  if (digitalTimeEl) {
    digitalTimeEl.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  const periodInfo = getCurrentTimePeriodInfo(now);
  if (periodTextEl) {
    periodTextEl.textContent = periodInfo.periodName;
  }
}

// -------------------------------------------------------------------
// 5C. HỆ THỐNG THÔNG ĐIỆP HÀNG NGÀY & TÂM TÌNH ĐÊM KHUYA
// -------------------------------------------------------------------

const DAILY_MESSAGES = [
  { id: 1, title: 'Thông điệp khuyên răn', text: 'Cố gắng lên, đừng vì 60 phút lười theo chế độ mà chịu 60 phút trong phòng mổ sau này' },
  { id: 2, title: 'Thông điệp động viên', text: 'Mọi sự cố gắng dù ít hay nhiều đều đem lại kết quả tốt hơn hôm nay' },
  { id: 3, title: 'Thông điệp vực dậy', text: 'Trong lúc bạn buông thả bản thân vì không ăn nổi thì đang có người khác hối hận vì sao ngày trước không chịu ăn thế này' },
  { id: 4, title: 'Thông điệp tiếp sức', text: 'Chưa thấy sự thay đổi hả? Ráng lên, một chút nữa thôi, thành công đâu phải ngày 1 ngày 2 đúng chứ, cố lên' },
  { id: 5, title: 'Thông điệp an ủi', text: 'Nay vui hay buồn? Thôi, làm tí ức gà đi hen' },
  { id: 6, title: 'Thông điệp đề xuất', text: 'Ăn nhiều trái cây rau củ quả vào nhé, đẹp da lắm' },
  { id: 7, title: 'Thông điệp ủng hộ', text: 'Ngày mới vui vẻ nhen, bạn đang làm tốt lắm, cứ tiếp tục thế nhé' },
  { id: 8, title: 'Thông điệp yêu thương', text: 'Đừng khóc nha, lâu lâu có thể buông thả 1 tí nhưng chỉ 1 ngày thôi nhé' },
  { id: 9, title: 'Thông điệp cợt nhả', text: 'Huhuhuhu, ăn ức gà đê' },
  { id: 10, title: 'Thông điệp hạnh phúc', text: 'Bạn đã thành công tới đâu rồi? Mình thật sự muốn thấy bạn cười vì hạnh phúc đấy' }
];

const STORAGE_KEY_DAILY_MESSAGE = 'ankhoedangdep_daily_message_record';

/**
 * Lấy thông điệp của ngày hôm nay:
 * - Mỗi ngày random 1 lần, giữ nguyên trong ngày cho dù tắt mở lại
 * - Qua 00:00 ngày mới sẽ tự động random thông điệp mới
 * - Chắc chắn khác với 2 ngày gần nhất
 */
function getTodayDailyMessage() {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  let record = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DAILY_MESSAGE);
    if (raw) record = JSON.parse(raw);
  } catch (e) {
    console.warn('Lỗi đọc daily message:', e);
  }

  // Nếu cùng ngày và đã có messageId -> giữ nguyên thông điệp đó
  if (record && record.date === todayStr && record.messageId) {
    const found = DAILY_MESSAGES.find(m => m.id === record.messageId);
    if (found) return found;
  }

  // Sang ngày mới hoặc lần đầu mở web:
  // Lịch sử tối đa 2 ngày gần nhất cần loại trừ
  let recentHistory = [];
  if (record && record.messageId) {
    const prevHistory = Array.isArray(record.history) ? record.history : [];
    recentHistory = [record.messageId];
    for (const id of prevHistory) {
      if (!recentHistory.includes(id) && recentHistory.length < 2) {
        recentHistory.push(id);
      }
    }
  }

  // Lọc ra danh sách thông điệp không nằm trong 2 ngày gần nhất
  const candidates = DAILY_MESSAGES.filter(m => !recentHistory.includes(m.id));
  const pool = candidates.length > 0 ? candidates : DAILY_MESSAGES;
  const chosen = pool[Math.floor(Math.random() * pool.length)];

  // Lưu bản ghi vào localStorage
  const newRecord = {
    date: todayStr,
    messageId: chosen.id,
    history: recentHistory
  };

  try {
    localStorage.setItem(STORAGE_KEY_DAILY_MESSAGE, JSON.stringify(newRecord));
  } catch (e) {
    console.warn('Lỗi lưu daily message:', e);
  }

  return chosen;
}

function openDailyMessageModal() {
  const msg = getTodayDailyMessage();
  const modal = document.getElementById('modal-daily-message');
  const titleEl = document.getElementById('daily-message-title');
  const textEl = document.getElementById('daily-message-text');

  if (titleEl) titleEl.textContent = msg.title;
  if (textEl) textEl.textContent = msg.text;

  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeDailyMessageModal() {
  const modal = document.getElementById('modal-daily-message');
  if (modal) {
    modal.style.display = 'none';
  }
}

// -------------------------------------------------------------------
// 5D. TỜ GIẤY TÂM TÌNH ĐÊM KHUYA & PHÁO HOA NỔ
// -------------------------------------------------------------------

let lateNightCountdownInterval = null;
let lateNightFireworksTimeout = null;

function openLateNightNoteModal() {
  const modal = document.getElementById('modal-late-night-note');
  const timeDisplay = document.getElementById('late-night-clock-display');
  const secondsLeftEl = document.getElementById('fireworks-seconds-left');

  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  if (timeDisplay) {
    timeDisplay.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  }

  if (modal) {
    modal.style.display = 'flex';
  }

  // Bắt đầu đếm ngược 10 giây
  let secondsLeft = 10;
  if (secondsLeftEl) secondsLeftEl.textContent = `${secondsLeft}s`;

  if (lateNightCountdownInterval) clearInterval(lateNightCountdownInterval);
  if (lateNightFireworksTimeout) clearTimeout(lateNightFireworksTimeout);

  lateNightCountdownInterval = setInterval(() => {
    secondsLeft--;
    if (secondsLeftEl) {
      if (secondsLeft > 0) {
        secondsLeftEl.textContent = `${secondsLeft}s`;
      } else {
        secondsLeftEl.textContent = 'ĐANG NỔ! 🎆';
      }
    }
    if (secondsLeft <= 0) {
      clearInterval(lateNightCountdownInterval);
      lateNightCountdownInterval = null;
    }
  }, 1000);

  // Đúng sau khi tờ giấy hiện ra được 10 giây -> Kích hoạt pháo hoa
  lateNightFireworksTimeout = setTimeout(() => {
    launchLateNightFireworks();
  }, 10000);
}

function closeLateNightNoteModal() {
  const modal = document.getElementById('modal-late-night-note');
  if (modal) {
    modal.style.display = 'none';
  }
  if (lateNightCountdownInterval) {
    clearInterval(lateNightCountdownInterval);
    lateNightCountdownInterval = null;
  }
}

/**
 * Pháo hoa nổ xung quanh màn hình:
 * - Tầm 10 quả pháo hoa nổ
 * - Thời gian nổ kéo dài trong 3s
 * - Mỗi pháo hoa có các màu: đỏ, vàng, cam, hồng, xanh naivi
 */
function launchLateNightFireworks() {
  const canvas = document.getElementById('fireworks-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  // 5 màu chuẩn: đỏ, vàng, cam, hồng, xanh naivi (navy blue)
  const FIREWORK_COLORS = [
    '#FF2E4C', // đỏ
    '#FFD200', // vàng
    '#FF7E00', // cam
    '#FF3B94', // hồng
    '#0A2540'  // xanh naivi
  ];

  const particles = [];
  const fireworksCount = 10;
  const durationMs = 3000;
  const startTime = Date.now();

  // Tạo 10 điểm nổ pháo hoa rải rác xung quanh màn hình trong 3s
  const fireworkSites = [];
  for (let i = 0; i < fireworksCount; i++) {
    const delay = (i / fireworksCount) * 1900 + Math.random() * 150;
    let x, y;
    const sector = i % 5;
    if (sector === 0) {
      // Góc trên trái
      x = window.innerWidth * (0.12 + Math.random() * 0.18);
      y = window.innerHeight * (0.15 + Math.random() * 0.22);
    } else if (sector === 1) {
      // Góc trên phải
      x = window.innerWidth * (0.70 + Math.random() * 0.18);
      y = window.innerHeight * (0.15 + Math.random() * 0.22);
    } else if (sector === 2) {
      // Mép trái
      x = window.innerWidth * (0.08 + Math.random() * 0.16);
      y = window.innerHeight * (0.42 + Math.random() * 0.32);
    } else if (sector === 3) {
      // Mép phải
      x = window.innerWidth * (0.76 + Math.random() * 0.16);
      y = window.innerHeight * (0.42 + Math.random() * 0.32);
    } else {
      // Phía trên giữa
      x = window.innerWidth * (0.35 + Math.random() * 0.30);
      y = window.innerHeight * (0.12 + Math.random() * 0.18);
    }
    fireworkSites.push({ delay, x, y, triggered: false });
  }

  function createExplosion(x, y) {
    const count = 55 + Math.floor(Math.random() * 15);
    for (let p = 0; p < count; p++) {
      const angle = (p / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.25;
      const speed = 2.2 + Math.random() * 5.8;
      const color = FIREWORK_COLORS[p % FIREWORK_COLORS.length];
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: 0.016 + Math.random() * 0.018,
        color,
        size: 3 + Math.random() * 2.5,
        gravity: 0.085
      });
    }
  }

  let animFrameId = null;

  function renderFireworks() {
    const elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Kích hoạt các quả pháo hoa theo thời gian
    fireworkSites.forEach(fw => {
      if (!fw.triggered && elapsed >= fw.delay) {
        fw.triggered = true;
        createExplosion(fw.x, fw.y);
      }
    });

    // Cập nhật và vẽ các hạt
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color === '#0A2540' ? '#1E3A8A' : p.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (elapsed < durationMs + 1000 && (elapsed < durationMs || particles.length > 0)) {
      animFrameId = requestAnimationFrame(renderFireworks);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = 'none';
      if (animFrameId) cancelAnimationFrame(animFrameId);
    }
  }

  animFrameId = requestAnimationFrame(renderFireworks);
}

/**
 * Xử lý khi nhấn vào đồng hồ:
 * - Trong khung giờ 10h01 tối (22:01) tới 4h59 sáng: Hiện tờ giấy tâm tình đêm khuya & pháo hoa
 * - Trong các khung giờ còn lại (5h00 - 22h00): Hiện món ăn ứng với buổi đó và thứ đó
 */
function handleClockWidgetClick() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  // 1. Kiểm tra khung giờ từ 10h01 tối (22:01) tới 4h59 sáng (04:59)
  const isLateNight = (totalMinutes >= 22 * 60 + 1) || (totalMinutes <= 4 * 60 + 59);
  if (isLateNight) {
    openLateNightNoteModal();
    return;
  }

  // 2. Ngoài khung giờ đêm khuya: Chuyển đến món ăn theo khung giờ & thứ hôm nay
  const periodInfo = getCurrentTimePeriodInfo(now);
  const currentDayId = getCurrentDayId(now);
  const currentDayConfig = DAYS_CONFIG.find(d => d.id === currentDayId);
  const dayName = currentDayConfig ? currentDayConfig.name : 'Hôm nay';

  if (state.currentView !== 'menu7d') {
    switchView('menu7d');
  }

  state.selectedDay = currentDayId;
  state.mealFilter = 'all';
  updateFilterButtons();
  renderMealPlan();

  const targetMeal = state.meals.find(m => m.day === currentDayId && m.mealType === periodInfo.mealType);

  if (targetMeal) {
    selectDish(targetMeal.id);

    setTimeout(() => {
      const card = document.querySelector(`.meal-slot-fav-btn[data-id="${targetMeal.id}"]`)?.closest('.meal-slot-card');
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('pulse-highlight');
        setTimeout(() => card.classList.remove('pulse-highlight'), 2400);
      }
    }, 120);

    const pad = n => String(n).padStart(2, '0');
    const timeStr = `${pad(hours)}:${pad(minutes)}`;
    showToast(`⏰ [${timeStr}] ${periodInfo.periodName} (${dayName})! Đã mở món: "${targetMeal.name.slice(0, 32)}..."`, 'success');
  } else {
    showToast(`Đã chuyển đến thực đơn ${dayName}!`, 'success');
  }
}

function initEventHandlers() {
  // 1. Navigation items (Sidebar + Mobile Bottom Nav)
  document.querySelectorAll('[data-view]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const view = el.dataset.view;
      if (view) switchView(view);
    });
  });

  // 2. Quick Edit Profile button in sidebar & header profile button
  const quickEditBtn = document.getElementById('btn-quick-edit-profile');
  const headerProfileBtn = document.getElementById('btn-header-profile');
  const companionBtn = document.getElementById('btn-companion-cta');

  if (quickEditBtn) quickEditBtn.addEventListener('click', () => switchView('settings'));
  if (headerProfileBtn) headerProfileBtn.addEventListener('click', () => switchView('settings'));
  if (companionBtn) companionBtn.addEventListener('click', () => {
    switchView('nutrition');
    showToast('Chào bạn! Cùng khám phá bí quyết giữ dáng và sống khỏe mỗi ngày nhé!', 'success');
  });

  // 2B. Analog Clock Widget click listener
  const clockWidget = document.getElementById('banner-clock-widget');
  if (clockWidget) {
    clockWidget.addEventListener('click', handleClockWidgetClick);
  }

  // 2C. Brown Parchment Scroll Widget click listener (Thông Điệp)
  const scrollWidget = document.getElementById('banner-scroll-widget');
  if (scrollWidget) {
    scrollWidget.addEventListener('click', openDailyMessageModal);
  }

  const closeMessageBtn = document.getElementById('btn-close-daily-message');
  const messageBackdrop = document.getElementById('daily-message-backdrop');
  const acknowledgeMessageBtn = document.getElementById('btn-acknowledge-message');
  if (closeMessageBtn) closeMessageBtn.addEventListener('click', closeDailyMessageModal);
  if (messageBackdrop) messageBackdrop.addEventListener('click', closeDailyMessageModal);
  if (acknowledgeMessageBtn) acknowledgeMessageBtn.addEventListener('click', closeDailyMessageModal);

  // 2D. Late Night Note Modal listeners
  const closeLateNightBtn = document.getElementById('btn-close-late-night');
  const lateNightBackdrop = document.getElementById('late-night-backdrop');
  const nightSleepBtn = document.getElementById('btn-night-sleep');
  if (closeLateNightBtn) closeLateNightBtn.addEventListener('click', closeLateNightNoteModal);
  if (lateNightBackdrop) lateNightBackdrop.addEventListener('click', closeLateNightNoteModal);
  if (nightSleepBtn) nightSleepBtn.addEventListener('click', closeLateNightNoteModal);

  // 3. Day tabs selection
  document.querySelectorAll('.day-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.dataset.day;
      state.selectedDay = day;
      updateFilterButtons();
      renderMealPlan();

      // Cuộn đến hàng ngày đó nếu không phải 'all'
      if (day !== 'all') {
        const targetRow = document.getElementById(`day-row-${day}`);
        if (targetRow) {
          targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  });

  // 4. Meal type filter buttons (Sáng, Trưa, Phụ, Tối)
  document.querySelectorAll('.meal-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.mealFilter = btn.dataset.filter;
      updateFilterButtons();
      renderMealPlan();
    });
  });

  // 5. Toggle Favorite filter button
  const favFilterBtn = document.getElementById('btn-toggle-favorite-filter');
  if (favFilterBtn) {
    favFilterBtn.addEventListener('click', () => {
      state.favoriteOnly = !state.favoriteOnly;
      updateFilterButtons();
      renderMealPlan();
    });
  }

  // 6. Global Search Input
  const searchInput = document.getElementById('global-search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
      }
      if (state.currentView !== 'menu7d') {
        switchView('menu7d');
      }
      renderMealPlan();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.searchQuery = '';
      clearSearchBtn.style.display = 'none';
      renderMealPlan();
    });
  }

  // 7. Right Detail Panel actions
  const backMenuBtn = document.getElementById('btn-back-to-menu');
  const closeDetailMobileBtn = document.getElementById('btn-close-detail-mobile');
  const dishFavBtn = document.getElementById('btn-dish-fav');
  const portionIncBtn = document.getElementById('btn-portion-inc');
  const portionDecBtn = document.getElementById('btn-portion-dec');

  const backdrop = document.getElementById('detail-backdrop');

  if (backMenuBtn) {
    backMenuBtn.addEventListener('click', () => {
      closeDetailPanel();
      const targetRow = document.getElementById(`day-row-${state.selectedDay}`);
      if (targetRow) targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  if (closeDetailMobileBtn) {
    closeDetailMobileBtn.addEventListener('click', () => {
      closeDetailPanel();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeDetailPanel();
    });
  }

  // Keyboard navigation: Escape key closes panels and modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailPanel();
      const addDishModal = document.getElementById('modal-add-dish');
      if (addDishModal) addDishModal.classList.remove('active');
    }
  });

  if (dishFavBtn) {
    dishFavBtn.addEventListener('click', () => {
      const liked = state.toggleFavorite(state.selectedDishId);
      const dish = state.meals.find(m => m.id === state.selectedDishId);
      renderDishDetail(dish);
      renderMealPlan();
      updateFavoritesBadge();
      showToast(liked ? 'Đã thêm vào món yêu thích!' : 'Đã bỏ yêu thích món ăn.', 'success');
    });
  }

  if (portionIncBtn) {
    portionIncBtn.addEventListener('click', () => {
      if (state.detailPortion < 10) {
        state.detailPortion++;
        const dish = state.meals.find(m => m.id === state.selectedDishId);
        renderDishDetail(dish);
      }
    });
  }

  if (portionDecBtn) {
    portionDecBtn.addEventListener('click', () => {
      if (state.detailPortion > 1) {
        state.detailPortion--;
        const dish = state.meals.find(m => m.id === state.selectedDishId);
        renderDishDetail(dish);
      }
    });
  }

  // 8. Shopping Checklist filter tabs & actions
  document.querySelectorAll('.shop-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.shop-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.ingredientCategoryFilter = btn.dataset.cat;
      renderShoppingList();
    });
  });

  const checkAllBtn = document.getElementById('btn-check-all-ingredients');
  const uncheckAllBtn = document.getElementById('btn-uncheck-all-ingredients');
  const printListBtn = document.getElementById('btn-print-shopping-list');

  if (checkAllBtn) {
    checkAllBtn.addEventListener('click', () => {
      const all = aggregateWeeklyIngredients();
      all.forEach(i => state.boughtItems.add(i.id));
      state.saveBoughtItems();
      renderShoppingList();
      showToast('Đã đánh dấu tất cả nguyên liệu đã mua!', 'success');
    });
  }

  if (uncheckAllBtn) {
    uncheckAllBtn.addEventListener('click', () => {
      state.boughtItems.clear();
      state.saveBoughtItems();
      renderShoppingList();
      showToast('Đã bỏ đánh dấu danh sách nguyên liệu.', 'success');
    });
  }

  if (printListBtn) {
    printListBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 9. Cost Estimator: Price Master Save & Reset
  const savePricesBtn = document.getElementById('btn-save-custom-prices');
  const resetPricesBtn = document.getElementById('btn-reset-prices');

  if (savePricesBtn) {
    savePricesBtn.addEventListener('click', () => {
      const inputs = document.querySelectorAll('.unit-price-input');
      const updated = { ...state.ingredients };

      inputs.forEach(input => {
        const id = input.dataset.id;
        const val = Number(input.value);
        if (updated[id] && !isNaN(val) && val >= 0) {
          updated[id].unitPrice = val;
          updated[id].retailPack = getDynamicRetailPack(id, val, updated[id].retailPack);
        }
      });

      state.saveCustomPrices(updated);
      renderCostEstimates();
      renderPriceMasterTable();
      renderShoppingList();
      renderMealPlan();
      const currentDish = state.meals.find(m => m.id === state.selectedDishId);
      if (currentDish) renderDishDetail(currentDish);

      showToast('Đã lưu bảng giá và tự động cập nhật ghi chú mua sắm!', 'success');
    });
  }

  if (resetPricesBtn) {
    resetPricesBtn.addEventListener('click', () => {
      if (confirm('Bạn có chắc muốn khôi phục toàn bộ đơn giá nguyên liệu về mặc định?')) {
        state.ingredients = JSON.parse(JSON.stringify(DEFAULT_INGREDIENTS));
        state.saveCustomPrices(state.ingredients);
        renderCostEstimates();
        renderPriceMasterTable();
        renderShoppingList();
        renderMealPlan();
        const currentDish = state.meals.find(m => m.id === state.selectedDishId);
        if (currentDish) renderDishDetail(currentDish);
        showToast('Đã khôi phục bảng giá nguyên liệu mặc định!', 'success');
      }
    });
  }

  // 10. Settings Profile Form submit
  const profileForm = document.getElementById('profile-settings-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newProfile = {
        gender: document.getElementById('setting-gender').value,
        age: Number(document.getElementById('setting-age').value) || 22,
        height: Number(document.getElementById('setting-height').value) || 156,
        weight: Number(document.getElementById('setting-weight').value) || 50,
        activity: document.getElementById('setting-activity').value,
        dailyBudget: Number(document.getElementById('setting-budget').value) || 70000
      };

      state.saveProfile(newProfile);
      renderUserProfile();
      renderCostEstimates();
      showToast('Đã lưu thông tin hồ sơ và ngân sách thành công!', 'success');
    });
  }

  // 11. Modal Add Dish handlers
  const openAddDishModalBtn = document.getElementById('btn-open-add-dish-modal');
  const closeAddDishModalBtn = document.getElementById('btn-close-add-dish-modal');
  const cancelAddDishBtn = document.getElementById('btn-cancel-add-dish');
  const addDishModal = document.getElementById('modal-add-dish');
  const addDishForm = document.getElementById('form-add-new-dish');

  if (openAddDishModalBtn && addDishModal) {
    openAddDishModalBtn.addEventListener('click', () => {
      addDishModal.classList.add('active');
    });
  }

  const closeModal = () => {
    if (addDishModal) addDishModal.classList.remove('active');
  };

  if (closeAddDishModalBtn) closeAddDishModalBtn.addEventListener('click', closeModal);
  if (cancelAddDishBtn) cancelAddDishBtn.addEventListener('click', closeModal);

  if (addDishForm) {
    addDishForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const day = document.getElementById('add-dish-day').value;
      const mealType = document.getElementById('add-dish-meal').value;
      const name = document.getElementById('add-dish-name').value;
      const tagline = document.getElementById('add-dish-tagline').value;
      const prepTime = `${document.getElementById('add-dish-time').value} phút`;
      const calories = Number(document.getElementById('add-dish-cals').value) || 300;
      const imgUrl = document.getElementById('add-dish-img-url').value || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';

      const mealTitles = {
        sang: 'Bữa sáng',
        trua: 'Bữa trưa',
        phu: 'Bữa phụ',
        toi: 'Bữa tối'
      };

      const newDish = {
        id: `custom_${Date.now()}`,
        day,
        mealType,
        mealTitle: mealTitles[mealType] || 'Bữa ăn',
        name,
        shortDesc: name,
        tagline,
        image: imgUrl,
        prepTime,
        difficulty: 'Dễ',
        calories,
        ingredients: [
          { id: 'uc_ga', name: 'Ức gà phi lê', amount: 0.12, unit: 'kg', displayAmount: '120g' },
          { id: 'rau_xanh_mix', name: 'Rau xanh ăn kèm', amount: 1, unit: 'phần', displayAmount: '1 đĩa' },
          { id: 'muoi_gia_vi', name: 'Gia vị cơ bản', amount: 1, unit: 'ít', displayAmount: '1 ít' }
        ],
        steps: [
          { title: 'Sơ chế nguyên liệu', desc: 'Rửa sạch nguyên liệu và thái miếng vừa ăn.' },
          { title: 'Nấu chín', desc: 'Nấu chín nguyên liệu theo cách luộc hoặc áp chảo ít dầu.' }
        ],
        tips: ['Luôn ưu tiên nêm nhạt để tốt cho vóc dáng và tim mạch.']
      };

      // Thay thế món hiện có hoặc thêm mới
      const existingIdx = state.meals.findIndex(m => m.day === day && m.mealType === mealType);
      if (existingIdx >= 0) {
        state.meals[existingIdx] = newDish;
      } else {
        state.meals.push(newDish);
      }

      state.saveData(STORAGE_KEYS.MEALS, state.meals);
      closeModal();
      addDishForm.reset();
      renderMealPlan();
      selectDish(newDish.id);
      showToast(`Đã thêm món "${name}" vào thực đơn!`, 'success');
    });
  }

  // 12. Reset all data
  const resetAllBtn = document.getElementById('btn-reset-all-data');
  if (resetAllBtn) {
    resetAllBtn.addEventListener('click', () => {
      if (confirm('Bạn có chắc muốn đặt lại toàn bộ thực đơn và thông tin về mặc định ban đầu?')) {
        state.resetAll();
        renderUserProfile();
        renderMealPlan();
        selectDish('t3_toi');
        showToast('Đã khôi phục toàn bộ dữ liệu ban đầu thành công!', 'success');
      }
    });
  }
}

// -------------------------------------------------------------------
// 7. INITIALIZATION ON DOM READY
// -------------------------------------------------------------------
function initApp() {
  renderUserProfile();
  renderMealPlan();
  renderShoppingList();
  renderCostEstimates();

  // Mặc định chọn món "Tôm luộc" (Thứ 3 Bữa tối) như trong hình mẫu
  const defaultDish = state.meals.find(m => m.id === state.selectedDishId) || state.meals[0];
  if (defaultDish) {
    renderDishDetail(defaultDish);
  }

  initEventHandlers();

  // Khởi động đồng hồ thời gian thực
  updateClock();
  setInterval(updateClock, 1000);

  console.log('Ăn Khỏe Dáng Đẹp - Healthy Meal Planner Dashboard Initialized successfully!');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

