#!/bin/bash
# 服务启动脚本

echo "正在停止服务..."

INSTALL_DIR="$HOME/Sub-Store"
DATA_DIR="$INSTALL_DIR/data"
FRONTEND_DIR="$INSTALL_DIR/frontend"

# 先停止服务
pm2 stop http-meta && pm2 stop Sub-Store

#if [ $? -ne 0 ]; then
#  echo "停止 Sub-Store 服务失败！"
#  exit 1 # 退出脚本，表示失败
#fi
#echo "Sub-Store 服务停止成功。"


#if [ $? -ne 0 ]; then
#  echo "停止 http-meta 服务失败！"
#  exit 1 # 退出脚本，表示失败
#fi
echo "http-meta 服务停止成功。"

echo "服务停止完成。"

echo "正在启动服务..."

# 再启动服务...
META_FOLDER="$DATA_DIR" HOST=:: PORT=9876 pm2 start "$DATA_DIR/http-meta.bundle.js" --name "http-meta"
if [ $? -ne 0 ]; then
  echo "启动 http-meta 服务失败！"
  exit 1 # 退出脚本，表示失败
fi
echo "http-meta 服务启动成功。"

SUB_STORE_FRONTEND_PATH="$FRONTEND_DIR" \
SUB_STORE_MMDB_COUNTRY_PATH="$DATA_DIR/GeoLite2-Country.mmdb" \
SUB_STORE_MMDB_ASN_PATH="$DATA_DIR/GeoLite2-ASN.mmdb" \
pm2 start "$INSTALL_DIR/sub-store.bundle.js" --name "Sub-Store"
if [ $? -ne 0 ]; then
  echo "启动 Sub-Store 服务失败！"
  exit 1 # 退出脚本，表示失败
fi
echo "Sub-Store 服务启动成功。"

echo "服务启动完成。"
echo "服务重启完成。"

exit 0 # 脚本执行成功退出