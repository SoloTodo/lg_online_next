import {apiSettings} from "./react-utils/settings";

export const settings = {
  ...apiSettings,
  chileCountryId: 1,
  clpCurrencyId: 1,
  websiteId: 6,
  googleAnalyticsId: 'UA-11970222-13',
  lgAdWordsConversionId: 'AW-3270351152',
  facebookId: '1014408442058543',
  storeIds: [9, 18, 11, 5, 30, 60, 67, 37, 38, 61, 12, 85, 43, 23, 97, 87, 167, 86, 181, 195, 197],
  domain: 'https://ssr.lgonline.cl',
  categoriesMetadata: {
    11: {
      name: 'Televisores',
      slug: 'televisores',
      groupingField: 'family_bundle_key',
      axisOrdering: 'size_family_value',
      axisLabel: 'size_family_unicode',
      subcategories: [
        {
          name: 'HD',
          label: 'HD',
          title: 'Televisores HD',
          slug: 'televisores_hd'
        },
        {
          name: 'Full HD',
          label: 'Full HD',
          title: 'Televisores Full HD',
          slug: 'televisores_full_hd'
        },
        {
          name: 'UHD 4K',
          label: 'Ultra HD 4K',
          title: 'Televisores Ultra HD 4K',
          slug: 'televisores_ultra_hd_4k'
        },
        {
          name: 'SUPER UHD 4K',
          label: 'SUPER UHD 4K',
          title: 'Televisores SUPER UHD 4K',
          slug: 'televisores_super_uhd_4k'
        },
        {
          name: 'OLED 4K',
          label: 'OLED 4K',
          title: 'Televisores OLED 4K',
          slug: 'televisores_oled_4k'
        }
      ],
      specsTemplates: [
        pe => `Tamaño de ${pe.product.specs.size_family_unicode}`,
        pe => `Resolución ${pe.product.specs.resolution_commercial_name}`,
        pe => `${pe.customFields.custom_1}`,
        pe => `${pe.customFields.custom_2}`,
        pe => `${pe.customFields.custom_3}`,
      ]
    },
    15: {
      name: 'Refrigeradores',
      slug: 'refrigeradores',
      // groupingField: 'name',
      // axisOrdering: 'bundle_id',
      // axisLabel: 'bundle_unicode',
      subcategories: [
        {
          name: 'Top freezer',
          label: 'Top freezer',
          title: 'Refrigeradores top freezer',
          slug: 'refrigeradores_top_freezer'
        },
        {
          name: 'Bottom freezer',
          label: 'Bottom freezer',
          title: 'Refrigeradores bottom freezer',
          slug: 'refrigeradores_bottom_freezer'
        },
        {
          name: 'Side by Side',
          label: 'Side by Side',
          title: 'Refrigeradores Side by Side',
          slug: 'refrigeradores_side_by_side'
        },
        {
          name: 'French door',
          label: 'French door',
          title: 'Refrigeradores French door',
          slug: 'refrigeradores_french_door'
        },
        {
          name: 'Door-in-Door',
          label: 'Door-in-Door',
          title: 'Refrigeradores Door-in-Door',
          slug: 'refrigeradores_door_in_door'
        },
      ],
      specsTemplates: [
        pe => `Refrigerador ${pe.customFields.subcategory}`,
        pe => `Refrigerador de ${pe.product.specs.refrigerator_capacity} L.`,
        pe => `Congelador de ${pe.product.specs.freezer_capacity} L.`,
        pe => `Eficiencia energética clase ${pe.product.specs.energy_efficiency_unicode}`,
      ]
    },
    19: {
      name: 'Lavadoras',
      slug: 'lavadoras',
      subcategories: [
        {
          name: 'Lavadora carga frontal',
          label: 'Lavadoras carga frontal',
          title: 'Lavadoras carga frontal',
          slug: 'lavadoras_carga_frontal'
        },
        {
          name: 'Lavadora carga superior',
          label: 'Lavadoras carga superior',
          title: 'Lavadoras carga superior',
          slug: 'lavadoras_carga_superior'
        },
        {
          name: 'Lavadora y secadora',
          label: 'Lavadoras y secadoras',
          title: 'Lavadoras y secadoras',
          slug: 'lavadoras_y_secadoras'
        },
        {
          name: 'Secadora',
          label: 'Secadoras',
          title: 'Secadoras',
          slug: 'secadoras'
        },
        {
          name: 'Lavadora TwinWash',
          label: 'Lavadoras TwinWash',
          title: 'Lavadoras TwinWash',
          slug: 'lavadoras_twinwash'
        },
        {
          name: 'Lavadora TwinWash Mini',
          label: 'Lavadoras TwinWash Mini',
          title: 'Lavadoras TwinWash Mini',
          slug: 'lavadoras_twinwash_mini'
        }
      ],
      specsTemplates: [
        pe => `${pe.customFields.subcategory}`,
        pe => `Capacidad de lavado de ${pe.product.specs.capacity_unicode}`,
        pe => `Tambor de ${pe.product.specs.drum_material_unicode.toLowerCase()}`,

      ]

    },
    17: {
      name: 'Microondas',
      slug: 'microondas',
      specsTemplates: [
        pe => `Potencia de ${pe.product.specs.power_unicode}`,
        pe => `Capacidad de ${pe.product.specs.capacity} L.`,
        pe => `${pe.product.specs.has_grill ? 'Con función de grill' : ''}`,

      ]
    },
    6: {
      name: 'Celulares',
      slug: 'celulares',
      specsTemplates: [
        pe => `Pantalla de ${pe.product.specs.screen_size_unicode}`,
        pe => {
          const totalCoreCount = pe.product.specs.soc_processor_core_count_value + (pe.product.specs.soc_secondary_processor_core_count_value || 0);
          const coreDict = {
            1: 'single', 2: 'dual', 3: 'tri', 4: 'quad', 5: 'penta', 6: 'hexa', 7: 'hepta', 8: 'octa'
          };
          return `Procesador ${coreDict[totalCoreCount]} core de ${pe.product.specs.soc_processor_frequency} MHz`
        },
        pe => `${pe.product.specs.internal_storage_unicode} de capacidad intrena`,
        pe => `${pe.product.specs.ram_unicode} de RAM`,
        pe => `Cámara principal de ${pe.product.specs.back_camera}`,
        pe => `Cámara selfie de ${pe.product.specs.front_camera}`,
      ]
    },
    25: {
      name: 'Audio',
      slug: 'audio',
      subcategories: [
        {
          name: 'Minicomponente',
          label: 'Minicomponentes',
          title: 'Minicomponentes',
          slug: 'minicomponentes'
        },
        {
          name: 'Microcomponente',
          label: 'Microcomponentes',
          title: 'Microcomponentes',
          slug: 'microcomponentes'
        },
        {
          name: 'Soundbar',
          label: 'Soundbars',
          title: 'Soundbars',
          slug: 'soundbars'
        },
        {
          name: 'Parlante portátil',
          label: 'Parlantes portátiles Bluetooth',
          title: 'Parlantes portátiles Bluetooth',
          slug: 'parlantes_portatiles_bluetooth'
        },
        {
          name: 'Home theater',
          label: 'Home theaters',
          title: 'Home theaters',
          slug: 'home_theaters'
        }
      ],
      specsTemplates: [
        pe => `${pe.customFields.subcategory}`,
        pe => `Potencia de ${pe.product.specs.power} watts`,
        pe => `${pe.product.specs.has_bluetooth ? 'Con tecnología Bluetooth' : ''}`,
        pe => `${pe.customFields.custom_1}`,
        pe => `${pe.customFields.custom_2}`,
        pe => `${pe.customFields.custom_3}`,
      ]
    },
    4: {
      name: 'Monitores',
      slug: 'monitores',
      subcategories: [
        {
          name: 'Gamer',
          label: 'Gamer',
          title: 'Monitores Gamer',
          slug: 'monitores_gamer'
        },
        {
          name: 'Profesional',
          label: 'Profesionales',
          title: 'Monitores profesionales',
          slug: 'monitores_profesionales'
        },
        {
          name: 'UltraWide',
          label: 'UltraWide',
          title: 'Monitores UltraWide',
          slug: 'monitores_ultawide'
        },
        {
          name: 'Casa y oficina',
          label: 'Casa y oficina',
          title: 'Monitores para casa y oficina',
          slug: 'monitores_casa_y_oficina'
        }
      ],
      specsTemplates: [
        pe => `Tamaño de ${pe.product.specs.size_unicode}`,
        pe => `Resolución ${pe.product.specs.resolution_unicode}`,
        pe => `Tasa de refresco de ${pe.product.specs.refresh_rate_unicode}`,
        pe => `Tiempo de respuesta de ${pe.product.specs.response_time_unicode}`,
      ]
    },
    31: {
      name: 'Proyectores',
      slug: 'proyectores',
      specsTemplates: [
        pe => `${pe.product.specs.has_battery ? 'Proyector portátil con batería incorporada' : ''}`,
        pe => `Resolución ${pe.product.specs.resolution_unicode}`,
        pe => `Iluminación ${pe.product.specs.illumination_unicode}`,
        pe => `Proyección de hasta ${pe.product.specs.max_projection_size}"`,
      ]
    }
  }
};
