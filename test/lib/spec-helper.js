/**
 * Created by vedi on 29/10/2016.
 */

'use strict';

const nock = require('nock');

const RIGHT_KEY = '83309-RIGHT_KEY';
const WRONG_KEY = '83309-WRONG_KEY';
const BASE_URL = 'https://api.sandcage.com/0.2';

module.exports = {
  RIGHT_KEY,
  WRONG_KEY,
  initNock() {
    nock(BASE_URL)
      .post('/get-info', {
        key: RIGHT_KEY
      })
      .reply(200, {
        "request_id": "req_B8r09x8SucENLdGmHD8s08HDZDOEon",
        "status": "success",
        "files": [
          {
            "reference_id": "",
            "file_token": "file_1_j85f3_63bo8b5cx06r_zg6ub9z9ls3sbq",
            "directory": "img/",
            "filename": "logo.png",
            "type": "image/png",
            "size": 24794,
            "action": "save",
            "status": "processed",
            "url": "http://www.example.com/img/logo.jpg"
          },
          {
            "reference_id": "yqqp1wa",
            "file_token": "file_tps0fb_skcz04xdn44sceog00i0ukcvkt",
            "directory": "img/",
            "filename": "header.png",
            "type": "image/png",
            "size": 0,
            "action": "resize",
            "status": "pending"
          },
          {
            "reference_id": "",
            "file_token": "file_5g7vfnmdh_65f1267b1vjshlzzo8wn74gn",
            "directory": "img/",
            "filename": "banner.png",
            "type": "image/png",
            "size": 0,
            "action": "crop",
            "status": "error"
          }
        ]
      });

    nock(BASE_URL)
      .post('/get-info', {
        key: WRONG_KEY
      })
      .reply(403, {});

    nock(BASE_URL)
      .post('/list-files', {
        key: RIGHT_KEY,
        directory: 'img/'
      })
      .reply(200, {
        "request_id": "req_ip8B_DLdOOcXQ1NDDshim_Vg4GNytCfLlhIt",
        "status": "success",
        "files": [
          {
            "reference_id": "xrw7d",
            "file_token": "file_wjcdrmz5wfbfhfqyt4lqfpq7oc8o0gm2illz",
            "directory": "img/",
            "filename": "logo.png",
            "type": "image/png",
            "size": 5662912,
            "status": "processed",
            "url": "http://www.example.com/img/logo.jpg"
          },
          {
            "reference_id": "ggdnn1t",
            "file_token": "file_cptoev9ldt5ld1jchsawg_5fy9r3gp",
            "directory": "img/",
            "filename": "header.png",
            "type": "image/png",
            "size": 0,
            "status": "pending"
          },
          {
            "reference_id": "k3h_k",
            "file_token": "file_v5m610__lcnel8dx5d_nla3gw8lq16yubp6u33",
            "directory": "img/",
            "filename": "banner.png",
            "type": "image/png",
            "size": 0,
            "status": "error"
          }
        ]
      });

    nock(BASE_URL)
      .post('/list-files', {
        key: WRONG_KEY
      })
      .reply(403, {});

    nock(BASE_URL)
      .post('/schedule-tasks', {
        key: RIGHT_KEY
      })
      .reply(200, {
        "request_id": "req_T4PfpZBHU4KET2At8yw8m0zydZg3Ck5",
        "status": "success",
        "tasks": [
          {
            "src_url": "http://cdn.sandcage.com/p/a/img/logo.jpg",
            "reference_id": "",
            "file_token": "file_f1f457p1j4vvcenskf3bbrdhzq2ixdzv",
            "filename": "6b51hwgvl7d_u6wrouffcyxr1osh7r_yp0_k8wy_zkpf_56fs36oa_ss5zs9nmw5wyc3w",
            "actions": "save"
          },
          {
            "src_url": "http://cdn.sandcage.com/p/a/img/logo.jpg",
            "reference_id": "",
            "file_token": "file_wao7cfkfqr1cm4ymutjm9ktkzl0fbosqemux9e",
            "filename": "hello_world.jpg",
            "actions": "resize",
            "width": 200
          },
          {
            "src_url": "http://cdn.sandcage.com/p/a/img/logo.jpg",
            "reference_id": "",
            "file_token": "file_ytez6iecs9474qdlz1dpx8hgaybbw3f4_8jp5ghl",
            "filename": "y_w8n1hfv146ysn3uk77vmbl5k4c3n72yx16r66xxogmqfafctsnm5t78v18",
            "actions": "crop",
            "coords": "10,10,50,50"
          },
          {
            "src_url": "http://cdn.sandcage.com/p/a/img/logo.jpg",
            "reference_id": "123456789",
            "file_token": "file_21ighpvrwr63k872ylplrl3zcbb2ti2vmgfv",
            "filename": "2c82w6zhr7h3f6st56zu9hlnizlpq175wy_vqzs5bpt4dww9ug548rtfho66",
            "actions": "rotate",
            "degrees": 90
          },
          {
            "src_url": "http://cdn.sandcage.com/p/a/img/logo.jpg",
            "reference_id": "123456789",
            "file_token": "file_3b1m23xlmy0_pj9_6m7ubhgkevail8_",
            "filename": "76okzsy395hl55b6xw5q_5dqpxy3o7s4ab7gxsx2v1b0i0ny",
            "actions": "cover",
            "height": 30,
            "width": 30,
            "cover": "bottom,right"
          },
          {
            "src_url": "http://cdn.sandcage.com/p/a/img/header_404.png",
            "reference_id": "",
            "file_token": "file_yq1x03oe923gp2o2_hqa_rh_k24v7tyqxp",
            "filename": "xy92p11rg9qavk_o9_vsxdtwz3fsop5hml31xwci_qzouiol2ln939rf2g84px20",
            "actions": "resize",
            "height": 30
          }
        ]
      });

    nock(BASE_URL)
      .post('/schedule_tasks', {
        key: WRONG_KEY
      })
      .reply(403, {});

    nock(BASE_URL)
      .post('/destroy-files', {
        key: RIGHT_KEY
      })
      .reply(200, {
        "request_id": "req_ca0aOKSPQ_UoBgwU6BFIB7g2TnZ6CivhFuLR_q",
        "status": "success"
      });

    nock(BASE_URL)
      .post('/destroy-files', {
        key: WRONG_KEY
      })
      .reply(403, {});


  }
};