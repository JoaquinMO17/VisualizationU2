import pandas as pd

df_btc = pd.read_csv("bitcoin_interest_global.csv")
df_eth = pd.read_csv("ethereum_interest_global.csv")
df_ada = pd.read_csv("cardano_interest_global.csv")
df_doge = pd.read_csv("doge_interest_global.csv")
df_xrp = pd.read_csv("ripple_interest_global.csv")


# bitcoin
df_btc["Crypto"] = "Bitcoin"

# ethereum
df_eth["Crypto"] = "Ethereum"

# cardano
df_ada["Crypto"] = "Cardano"

# doge
df_doge["Crypto"] = "Dogecoin"

# ripple
df_xrp["Crypto"] = "Ripple"



# --- COMBINAR DATAFRAMES ---
df_total = pd.concat([df_btc, df_eth, df_ada, df_doge, df_xrp], ignore_index=True)

# --- REORDENAR COLUMNAS ---
df_total = df_total[["Week", "Interest", "Country", "Crypto"]]

# --- MOSTRAR RESULTADO ---
print(df_total.head())

df_total.to_csv("C:\\Users\\joaqu\\OneDrive\\Documents\\prueba\\crypto_interest_global.csv")