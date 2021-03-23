#include<iostream>
#include<cstdio>
#include<algorithm>
#include<cassert>
#include<vector>

using namespace std;

typedef long long ll;

const int N(5e5 + 9);

int T, n, m, ans;
int tree[N << 2], lazy[N << 2];
int cnt;
int size[N], dep[N], son[N], head[N], f[N], id[N];
vector<int>a[N];

void dfs1(int u, int fa)
{
    size[u] = 1;
    for (int i = 0; i < (int)a[u].size(); i++)
    {
        int v = a[u][i];
        if (v == fa) continue;
        f[v] = u; dep[v] = dep[u] + 1;
        dfs1(v, u);
        size[u] += size[v];
        if (size[son[u]] < size[v])
        {
            son[u] = v;
        }
    }
}

void dfs2(int u, int hd)
{
    id[u] = ++cnt;
    head[u] = hd;
    if (!son[u]) return;
    dfs2(son[u], hd);
    for (int i = 0; i < (int)a[u].size(); i++)
    {
        int v = a[u][i];
        if (id[v]) continue;
        dfs2(v, v);
    }
}

void pushdown(int p)
{
    if (!lazy[p]) return;
    lazy[p << 1] = lazy[p << 1 | 1] = lazy[p];
    tree[p << 1] = tree[p << 1 | 1] = lazy[p];
    lazy[p] = 0;
}

void update(int p, int l, int r, int ql, int qr, int val)
{
    if (l >= ql && r <= qr)
    {
        tree[p] = val;
        lazy[p] = val;
        return;
    }
    pushdown(p);
    int mid = (l + r) >> 1;
    if (ql <= mid) update(p << 1, l, mid, ql, qr, val);
    if (qr > mid) update(p << 1 | 1, mid + 1, r, ql, qr, val);
}

int query(int p, int l, int r, int pos)
{
    if (l == r)
    {
        return tree[p] == 2 ? 1 : 0;
    }
    pushdown(p);
    int mid = (l + r) >> 1;
    if (pos <= mid) return query(p << 1, l, mid, pos);
    else return query(p << 1 | 1, mid + 1, r, pos);
}

void tree_update(int x)
{
    int y = 1;
    while (head[x] != head[y])
    {
        if (dep[head[x]] < dep[head[y]]) swap(x, y);
        update(1, 1, n, id[head[x]], id[x], 1);
        x = f[head[x]];
    }
    if (dep[x] > dep[y]) swap(x, y);
    update(1, 1, n, id[x], id[y], 1);
}

void debug()
{
    for (int i = 1; i <= n; i++)
    {
        printf("i %d, fa %d, size %d, dep %d, top %d, son %d\n", i, f[i], size[i], dep[i], head[i], son[i]);
    }
}
int main()
{
    scanf("%d", &n);
    for (int i = 1; i < n; i++)
    {
        int u, v;
        scanf("%d%d", &u, &v);
        a[u].push_back(v);
        a[v].push_back(u);
    }
    dfs1(1, 0); dfs2(1, 1);
    scanf("%d", &m);
    while (m--)
    {
        int kd, x;
        scanf("%d%d", &kd, &x);
        assert(kd == 1 || kd == 2 || kd == 3);
        if (kd == 1) //fill child
        {
            update(1, 1, n, id[x], id[x] + size[x] - 1, 2);
        }
        else if (kd == 2) //empty father
        {
            tree_update(x);
        }
        else
        {
            printf("%d\n", query(1, 1, n, id[x]));
        }
    }
    return 0;
}
