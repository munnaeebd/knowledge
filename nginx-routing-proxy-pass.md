https://gist.github.com/kekru/c09dbab5e78bf76402966b13fa72b9d2

```
stream {
    map_hash_bucket_size 128;

    upstream tokenized_pay_bka_sh {
        server tokenized.pay.bka.sh:443;
    }

    upstream payment_bkash_com {
        server payment.bkash.com:443;
    }

    upstream tc_customer_ui_backend_pgw_tc_pay_bka_sh {
        server tc-customer-ui-backend.pgw-tc.pay.bka.sh:443;
    }

    upstream directcharge_payment_bkash_com {
        server directcharge.payment.bkash.com:443;
    }

    upstream directcharge_pay_bka_sh {
        server directcharge.pay.bka.sh:443;
    }

    upstream checkout_pay_bka_sh {
        server checkout.pay.bka.sh:443;
    }

    upstream client_pay_bka_sh {
        server client.pay.bka.sh:443;
    }

    upstream checkout_customer_ui_backend_pgw_checkout_pay_bka_sh {
        server checkout-customer-ui-backend.pgw-checkout.pay.bka.sh:443;
    }

    upstream scripts_pay_bka_sh {
        server scripts.pay.bka.sh:443;
    }

    map $ssl_preread_server_name $upstream_name {
        tokenized.pay.bka.sh                    tokenized_pay_bka_sh;
        payment.bkash.com                       payment_bkash_com;
        tc-customer-ui-backend.pgw-tc.pay.bka.sh  tc_customer_ui_backend_pgw_tc_pay_bka_sh;
        directcharge.payment.bkash.com          directcharge_payment_bkash_com;
        directcharge.pay.bka.sh                 directcharge_pay_bka_sh;
        checkout.pay.bka.sh                     checkout_pay_bka_sh;
        client.pay.bka.sh                       client_pay_bka_sh;
        checkout-customer-ui-backend.pgw-checkout.pay.bka.sh  checkout_customer_ui_backend_pgw_checkout_pay_bka_sh;
        scripts.pay.bka.sh                      scripts_pay_bka_sh;
    }

    server {
        listen 443;
        listen [::]:443;

        ssl_preread on;
        proxy_pass $upstream_name;

    }
}
```
