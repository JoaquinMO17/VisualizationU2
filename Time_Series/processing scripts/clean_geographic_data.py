import pandas as pd

df_br = pd.read_csv("ripple_BZ.csv", skiprows=1)
df_cn = pd.read_csv("ripple_CN.csv", skiprows=1)
df_de = pd.read_csv("ripple_GM.csv", skiprows=1)
df_gb = pd.read_csv("ripple_UK.csv", skiprows=1)
df_in = pd.read_csv("ripple_ID.csv", skiprows=1)
df_jp = pd.read_csv("ripple_JP.csv", skiprows=1)
df_kr = pd.read_csv("ripple_SK.csv", skiprows=1)
df_mx = pd.read_csv("ripple_MX.csv", skiprows=1)
df_sg = pd.read_csv("ripple_SG.csv", skiprows=1)
df_usa = pd.read_csv("ripple_US.csv", skiprows=1)

# Brasil
df_br = df_br.rename(columns={df_br.columns[1]: "Interest"})
df_br = df_br.rename(columns={df_br.columns[0]: "Week"})
df_br["Country"] = "Brasil"

# China
df_cn = df_cn.rename(columns={df_cn.columns[1]: "Interest"})
df_cn = df_cn.rename(columns={df_cn.columns[0]: "Week"})
df_cn["Country"] = "China"

# Alemania
df_de = df_de.rename(columns={df_de.columns[1]: "Interest"})
df_de = df_de.rename(columns={df_de.columns[0]: "Week"})
df_de["Country"] = "Germany"

# India
df_in = df_in.rename(columns={df_in.columns[1]: "Interest"})
df_in = df_in.rename(columns={df_in.columns[0]: "Week"})
df_in["Country"] = "India"

# Great Britain
df_gb = df_gb.rename(columns={df_gb.columns[1]: "Interest"})
df_gb = df_gb.rename(columns={df_gb.columns[0]: "Week"})
df_gb["Country"] = "Great Britain"

# Japan
df_jp = df_jp.rename(columns={df_jp.columns[1]: "Interest"})
df_jp = df_jp.rename(columns={df_jp.columns[0]: "Week"})
df_jp["Country"] = "Japan"

# Korea
df_kr = df_kr.rename(columns={df_kr.columns[1]: "Interest"})
df_kr = df_kr.rename(columns={df_kr.columns[0]: "Week"})
df_kr["Country"] = "Korea"

# Mexico
df_mx = df_mx.rename(columns={df_mx.columns[1]: "Interest"})
df_mx = df_mx.rename(columns={df_mx.columns[0]: "Week"})
df_mx["Country"] = "Mexico"

# Singapore
df_sg = df_sg.rename(columns={df_sg.columns[1]: "Interest"})
df_sg = df_sg.rename(columns={df_sg.columns[0]: "Week"})
df_sg["Country"] = "Singapore"

# USA
df_usa = df_usa.rename(columns={df_usa.columns[1]: "Interest"})
df_usa = df_usa.rename(columns={df_usa.columns[0]: "Week"})
df_usa["Country"] = "USA"

# --- COMBINAR DATAFRAMES ---
df_total = pd.concat([df_br, df_cn, df_de, df_gb, df_in, df_jp, df_kr, df_mx, df_sg, df_usa], ignore_index=True)

# --- REORDENAR COLUMNAS ---
df_total = df_total[["Week", "Interest", "Country"]]

# --- MOSTRAR RESULTADO ---
print(df_total.head())

df_total.to_csv("C:\\Users\\joaqu\\OneDrive\\Documents\\prueba\\ripple_interest_global.csv")