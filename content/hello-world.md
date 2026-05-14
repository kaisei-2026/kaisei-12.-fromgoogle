---
title: "AIと陸上の融合：100m走の加速フェーズをプログラムする"
date: "2026-05-14"
---

## 陸上 × AI
陸上の加速フェーズにおけるピッチとストライドの相関を、自作のAIモデルで分析してみました。

## コードによる可視化
プログラミングによるデータ可視化は、トレーニングの質を劇的に変えます。

```javascript
const analyzeSpeed = (data) => {
  return data.map(point => point.pitch * point.stride);
};
