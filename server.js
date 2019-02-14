const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const routes = [{
  "id": 6,
  "slug": "celulares",
}, {
  "id": 25,
  "slug": "audio",
  "subcategories": [{
    "slug": "minicomponentes"
  }, {
    "slug": "microcomponentes"
  }, {
    "slug": "soundbars"
  }, {
    "slug": "parlantes_portatiles_bluetooth"
  }, {
    "slug": "home_theaters"
  }],
}, {
  "id": 17,
  "slug": "microondas",
}, {
  "id": 19,
  "slug": "lavadoras",
  "subcategories": [{
    "slug": "lavadoras_carga_frontal"
  }, {
    "slug": "lavadoras_carga_superior"
  }, {
    "slug": "lavadoras_y_secadoras"
  }, {
    "slug": "secadoras"
  }, {
    "slug": "lavadoras_twinwash"
  }, {
    "slug": "lavadoras_twinwash_mini"
  }],
}, {
  "id": 4,
  "slug": "monitores",
  "subcategories": [{
    "slug": "monitores_gamer"
  }, {
    "slug": "monitores_profesionales"
  }, {
    "slug": "monitores_ultawide"
  }, {
    "slug": "monitores_casa_y_oficina"
  }],
}, {
  "id": 31,
  "slug": "proyectores",
}, {
  "id": 15,
  "slug": "refrigeradores",
  "subcategories": [{
    "slug": "refrigeradores_top_freezer"
  }, {
    "slug": "refrigeradores_bottom_freezer"
  }, {
    "slug": "refrigeradores_side_by_side"
  }, {
    "slug": "refrigeradores_french_door"
  }, {
    "slug": "refrigeradores_door_in_door"
  }],
}, {
  "id": 11,
  "slug": "televisores",
  "subcategories": [{
    "slug": "televisores_hd"
  }, {
    "slug": "televisores_full_hd"
  }, {
    "slug": "televisores_ultra_hd_4k"
  }, {
    "slug": "televisores_super_uhd_4k"
  }, {
    "slug": "televisores_oled_4k"
  }],
}];

app.prepare()
  .then(() => {
    const server = express();

    for (const route of routes) {
      server.get(`/${route.slug}`, (req, res) => {
        const actualPage = '/browse';
        const queryParams = { section: route.slug };
        app.render(req, res, actualPage, queryParams)
      });

      const subcategories = route.subcategories || [];
      for (const subcategory of subcategories) {
        server.get(`/${subcategory.slug}`, (req, res) => {
          const actualPage = '/browse';
          const queryParams = { section: subcategory.slug };
          app.render(req, res, actualPage, queryParams)
        });
      }
    }

    server.get('*', (req, res) => {
      return handle(req, res)
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1)
  });
