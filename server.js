// Only used for development! Serverless routes are configured in now.json

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
    "slug": "televisores_nano_cell_4k"
  }, {
    "slug": "televisores_oled_4k"
  }],
}];

const landings = [
  {
    slug: 'did'
  },
  {
    slug: 'instantpartysummer'
  },
  {
    slug: 'twinwash'
  },
  {
    slug: 'oportunidadesdelasemana'
  },
  {
    slug: 'instaviewbundle'
  },
  {
    slug: 'neobundle'
  },
  {
    slug: 'planperfecto'
  },
  {
    slug: 'oledn1'
  },
  {
    slug: 'lgweek'
  },
  {
    slug: 'modernizate'
  },
  {
    slug: 'especial_lavado'
  },
  {
    slug: 'DuplaPerfectaLG'
  },
];

app.prepare()
  .then(() => {
    const server = express();

    server.get(`/`, (req, res) => {
      const actualPage = '/browse';
      app.render(req, res, actualPage)
    });

    server.get(`/products/:id-:slug`, (req, res) => {
      const actualPage = '/products';
      const queryParams = { product: req.params.id, slug: req.params.slug };
      app.render(req, res, actualPage, queryParams)
    });

    server.get(`/products/:id`, (req, res) => {
      const actualPage = '/products';
      const queryParams = { product: req.params.id };
      app.render(req, res, actualPage, queryParams)
    });

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

    for (const landing of landings) {
      server.get(`/${landing.slug}`, (req, res) => {
        const actualPage = '/landing';
        const queryParams = { landing: landing.slug };
        app.render(req, res, actualPage, queryParams)
      });
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
